import express from "express";
import mongoose from "mongoose";
import product from "./api/product.js";
import usersRouter from "./api/routes/users.js";
import categoriesRoutes from "./api/routes/categories.js";
import tableRoutes from "./api/routes/table.js";
import itemsRoutes from "./api/routes/items.js";
import uploadRoutes from "./api/routes/upload.js";
import ordersRoutes from "./api/routes/orders.js";
import bookedRoutes from "./api/routes/booked.js";
import restaurantsRoutes from "./api/routes/restaurants.js";

const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("public"));
app.use("/api/product", product);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/booked", bookedRoutes);
app.use("/api/restaurant", restaurantsRoutes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error));
