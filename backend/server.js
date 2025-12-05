// import required modules
const express = require("express"); // express to build the server
const mongoose = require("mongoose"); // mongoose for mongodb connection
const cors = require("cors"); // cors middleware to allow cross origin requests
require("dotenv").config(); // load env variables

// import routes for lessons and orders
const lessonRoutes = require("./routes/lessonRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express(); // create an express application
app.use(cors()); // enable CORS for all routes
app.use(express.json()); // middleware to parse json request bodies

// connect to mongo atlas using URI from env variables
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// mount the lesson and order routes
app.use("/lessons", lessonRoutes); //fetch all lessons
app.use("/orders", orderRoutes); // place new orders

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));