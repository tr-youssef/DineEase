import express from "express";
import { uploadItem } from "../controllers/upload.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/item", upload.single("item"), uploadItem);

export default router;
