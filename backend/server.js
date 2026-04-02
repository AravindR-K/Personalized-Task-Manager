const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log("Before routes");
const taskRoutes = require('./routes/taskRoutes'); // ✅ IMPORT
console.log("After routes import");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo');

// ✅ THIS LINE IS THE MOST IMPORTANT
app.use('/tasks', taskRoutes);

console.log("Routes registered");

app.listen(3000, () => {
  console.log("Server running on port 3000");
});