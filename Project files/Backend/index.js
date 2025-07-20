const express = require("express");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5100;

const models = require("./db/schema");
const connectDB = require("./db/connect");

// ✅ Import Routes
const productRoutes = require('./db/product'); // Product route file

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ JWT Middleware

// Admin JWT
function adminAuthenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  jwt.verify(token, 'ADMIN_SECRET_TOKEN', (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
}

// User JWT
const userAuthenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).send('Invalid JWT Token');
    const decoded = jwt.verify(token, 'USER_SECRET_TOKEN');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// ✅ Admin Login
app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  const user = await models.Admins.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const jwtToken = jwt.sign({ userId: user._id }, 'ADMIN_SECRET_TOKEN');
  res.json({ user, jwtToken });
});

// ✅ Admin Register
app.post('/adminregister', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    if (!username) return res.status(400).send('Username is required');

    const userExists = await models.Admins.findOne({ username });
    if (userExists) return res.status(400).send('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new models.Admins({ firstname, lastname, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Successfully registered' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ✅ Use other route files
app.use(productRoutes); // handles /api/admin/add-product

// ✅ Server Start
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
