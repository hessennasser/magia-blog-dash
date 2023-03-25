import express from "express";
const dashboardRouter = express.Router();
import BlogSchema from "../models/blogModel.js";
import upload from "../utils/ImgUpload.js";

dashboardRouter.post("/api/login_dash", (req, res) => {
  if (
    req.body.email == process.env.EMAIL &&
    req.body.password == process.env.PASSWORD
  ) {
    res.cookie("login", "true");
    res.json({ msg: "success", status: "200" });
  } else {
    res.cookie("login", "false");

    res.json({ msg: "failed", status: "400" });
  }
});
dashboardRouter.get("/dashboard", (req, res) => {
  if (req.cookies.login == "true") {
    res.redirect("/dashboard/create");
  } else {
    res.render("dashboard");
  }
});

dashboardRouter.get("/dashboard/create", async (req, res) => {
  if (req.cookies.login == "true") {
    try {
      res.render("create-blog");
    } catch (err) {
      console.error(err);
    }
  } else {
    res.redirect("/dashboard");
  }
});

dashboardRouter.get("/dashboard/update", async (req, res) => {
  console.log(req.cookies.login == "false");
  if (req.cookies.login == "true") {
    const blogFound = await BlogSchema.find();
    res.render("update-blog", { blog: blogFound });
  } else {
    res.redirect("/dashboard");
  }
});
dashboardRouter.get("/dashboard/update/:slug", async (req, res) => {
  console.log(req.cookies.login == "false");
  if (req.cookies.login == "true") {
    const blogFound = await BlogSchema.findOne({ slug: req.params.slug });
    res.render("update-blog-one", { blog: blogFound });
  } else {
    res.redirect("/dashboard");
  }
});
dashboardRouter.get("/dashboard/delete", async (req, res) => {
  console.log(req.cookies.login == "false");
  if (req.cookies.login == "true") {
    const blogFound = await BlogSchema.find();
    res.render("delete-post", { blog: blogFound });
  } else {
    res.redirect("/dashboard");
  }
});

export default dashboardRouter;
