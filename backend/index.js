require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./utils/db");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

//DataBase Connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/order", orderRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening to the port ${port}`));
