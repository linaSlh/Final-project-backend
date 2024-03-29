// require("dotenv/config");
require('dotenv').config();
require("./db");
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();


require("./config")(app);

// 👇 Start handling routes here
// const allRoutes = require("./routes");
// app.use("/api", allRoutes);

const postRouter = require("./routes/post.routes");
app.use("/api", isAuthenticated, postRouter);

// const commentRouter = require("./routes/comment.routes");
// app.use("/api", isAuthenticated, commentRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// require("./error-handling")(app);
//comment
const commentRouter = require("./routes/comment.routes");
app.use("/api", isAuthenticated, commentRouter);
module.exports = app;