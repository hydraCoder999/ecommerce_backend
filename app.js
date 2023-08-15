const express = require("express");
const path = require("path"); // Add this line to import the path module
const productRouter = require("./Routes/productRoutes");
const errormiddleware = require("./middleware/errormiddleware");
const userRouter = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const OrderRouter = require("./Routes/orderRoutes");
const CategoryRouter = require("./Routes/categoryRoute");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const PaymentRouter = require("./Routes/PaymentRoute");
const passport = require("passport");
require("./utils/Passport");
const session = require("express-session");
const googlerouter = require("./Routes/GoogleRoutes");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "./dist")));

// Allow requests from your frontend domain
app.use(
  cors({
    origin: "", // Replace with your frontend domain
    optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
  })
);
//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload());

//Passprt Middlewaare
app.use(
  session({
    secret: "your-session-secret", // Replace with your session secret
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//error middleware // No need this
// app.use(function (error, rq, res, next) {
//   console.log(error);
// });

// Routes googlke

app.use("/auth", googlerouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

module.exports = app;
