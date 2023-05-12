import express from "express";
import product from "./api/product.js";

const app = express();

app.use(express.json({ extended: false }));
app.use("/api/product", product);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
