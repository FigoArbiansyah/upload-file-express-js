import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import "dotenv/config";
import ProductRoute from "./routes/ProductRoute.js";

const { APP_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(ProductRoute);

app.listen(APP_PORT, () => console.log(`Server running at port ${APP_PORT}`));
