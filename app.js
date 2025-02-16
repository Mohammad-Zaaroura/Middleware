const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware לרישום בקשות
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
};

// Middleware לבדיקה אם המשתמש הוא admin
const authMiddleware = (req, res, next) => {
  if (req.query.user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next();
};

// החלת ה-Logger Middleware על כל הבקשות
app.use(logger);

// הגדרת תיקייה סטטית לשרת קבצים
app.use(express.static(path.join(__dirname, "assets")));

// מסלול לדף הבית
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// מסלול לעמוד הניהול (דורש הרשאות)
app.get("/admin", authMiddleware, (req, res) => {
  res.send("!ברוכים הבאים לעמוד הניהול!");
});

// מסלול לדף ציבורי
app.get("/public", (req, res) => {
  res.send("זהו דף ציבורי.");
});

// טיפול במסלולים לא קיימים - דף 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});