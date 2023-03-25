import express from "express";
import { blogController } from "../controllers/blogController.js";
import upload from "../utils/ImgUpload.js";
const { create, deleteEspecially, getAll, getEspecially, updateEspecially } =
  blogController;

const blogRouter = express.Router();

blogRouter.get("/", getAll);
blogRouter.post("/api/create-blog", upload.single("img"), create);
blogRouter.get("/blog/:slug", getEspecially);
blogRouter.post("/api/update/:slug", upload.single("img"), updateEspecially);
blogRouter.delete("/api/delete/:slug", deleteEspecially);

export default blogRouter;
