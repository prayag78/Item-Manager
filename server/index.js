import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongoDb.js";
import ItemRouter from "./routes/itemRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/items", ItemRouter);

app.get("/", (req, res) => {
  res.send(`Server started at port ${port}`);
});

app.listen(port, () => console.log("Server Started at", port));

export default app;
    