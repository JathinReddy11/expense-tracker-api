require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

// const cors = require("cors");
// app.use(
//   cors({
//     origin: "https://myfrontend.com",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }),
// );

const auth_Router = require("./routes/auth.routes");
const category_Router = require("./routes/category.routes");
const expense_Router = require("./routes/expense.routes");
const reports_Router = require("./routes/reports.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());

app.use("/auth", auth_Router);
app.use("/category", category_Router);
app.use("/expense", expense_Router);
app.use("/reports", reports_Router);

app.use(errorHandler);

const port = "5000";

if (process.env.NODE_ENV !== "test") {
  app.listen(port);
}

module.exports = app;
