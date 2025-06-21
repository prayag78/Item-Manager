import express from "express";
import { getAllItems, createItem } from "../controllers/itemController.js";
import upload from "../middleware/multer.js";

const ItemRouter = express.Router();

ItemRouter.get("/getAllItems", getAllItems);
ItemRouter.post(
  "/createItem",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  createItem
);

export default ItemRouter;
