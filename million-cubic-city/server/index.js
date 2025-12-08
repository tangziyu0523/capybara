const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'million-cubic-city-secret-key';

app.use(cors());
app.use(bodyParser.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'cms.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    // Content Table
    db.run(`CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT,
      type TEXT
    )`);

    // Logs Table
    db.run(`CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      action TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed Admin User (admin/admin123)
    db.get("SELECT * FROM users WHERE username = ?", ['admin'], (err, row) => {
      if (!row) {
        const hash = bcrypt.hashSync('admin123', 8);
        db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['admin', hash, 'admin']);
        console.log("Admin user created");
      }
    });
  });
}

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

// Routes

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token: token, user: { username: user.username, role: user.role } });
  });
});

// Register
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send('Missing fields');
  }

  // Password strength check (simplified)
  if (password.length < 8) {
    return res.status(400).send('Password too short');
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (user) return res.status(400).send('Username already exists');

    const hash = bcrypt.hashSync(password, 8);
    // In a real app, verify email via token. Here we just add the user.
    db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hash, 'user'], function (err) {
      if (err) return res.status(500).send('Error registering user');

      // Auto login
      const token = jwt.sign({ id: this.lastID, username: username, role: 'user' }, SECRET_KEY, {
        expiresIn: 86400
      });

      res.status(200).send({ auth: true, token: token, user: { username: username, role: 'user' } });
    });
  });
});

// Get All Content
app.get('/api/content', (req, res) => {
  db.all("SELECT * FROM content", (err, rows) => {
    if (err) return res.status(500).send("Error retrieving content");
    const contentMap = {};
    rows.forEach(row => {
      contentMap[row.key] = row.value;
    });
    res.status(200).send(contentMap);
  });
});

// Update Content (Protected)
app.post('/api/content', verifyToken, (req, res) => {
  const { key, value, type } = req.body;

  db.run(`INSERT INTO content (key, value, type) VALUES (?, ?, ?) 
          ON CONFLICT(key) DO UPDATE SET value = ?, type = ?`,
    [key, value, type || 'text', value, type || 'text'],
    function (err) {
      if (err) return res.status(500).send("Error updating content");

      // Log action
      db.run("INSERT INTO logs (username, action) VALUES (?, ?)",
        [req.username, `Updated content: ${key}`]);

      res.status(200).send({ message: "Content updated successfully" });
    }
  );
});

// Get Logs (Protected)
app.get('/api/logs', verifyToken, (req, res) => {
  db.all("SELECT * FROM logs ORDER BY timestamp DESC LIMIT 50", (err, rows) => {
    if (err) return res.status(500).send("Error retrieving logs");
    res.status(200).send(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
