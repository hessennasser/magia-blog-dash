import slugify from "slugify";
import BlogSchema from "../models/blogModel.js";

export const blogController = {
  create: async (req, res) => {
    try {
      const { title, decs, body, user, topics } = req.body;
      let slug = req.body.slug ? slugify(req.body.slug) : slugify(title);

      const newBlog = new BlogSchema({
        title,
        slug,
        img: req.file.filename,
        decs,
        body,
        user,
        topics,
      });
      await newBlog.save();
      res.redirect(`/blog/${slug}`);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const blogFound = await BlogSchema.find();
      res.render("index", { blog: blogFound });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getEspecially: async (req, res) => {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.status(404).json({ msg: "You Must Type The Slug" });
      }
      const blogFound = await BlogSchema.findOne({ slug });
      if (!blogFound) {
        return res
          .status(404)
          .json({ msg: `There Is No Blog On This Slug: ${slug}` });
      }
      res.render("blog", { blog: blogFound });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateEspecially: async (req, res) => {
    try {
      const { slug } = req.params;
      const { img, title, decs, body, user, topics, data } = req.body;
      if (!slug) {
        return res.status(404).json({ msg: "You Must Type The Slug" });
      }
      const blogFound = await BlogSchema.findOne({ slug });
      const blogUpdated = await BlogSchema.findOneAndUpdate(
        { slug },
        {
          img,
          title,
          decs,
          body,
          user,
          topics,
          data,
          slug: req.body.slug ? slugify(req.body.slug) : slugify(title),
        },
        { new: true }
      );
      if (!blogFound) {
        return res
          .status(404)
          .json({ msg: `There Is No Blog On This Slug: ${slug}` });
      }

      res.redirect("/");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteEspecially: async (req, res) => {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.status(404).json({ msg: "You Must Type The Slug" });
      }
      const blogFound = await BlogSchema.findOne({ slug });
      const blogDeleted = await BlogSchema.deleteMany({
        _id: blogFound._id,
      });
      if (!blogFound) {
        return res
          .status(404)
          .json({ msg: `There Is No blog On This Slug: ${slug}` });
      }

      res.json({
        msg: `The blog on this slug ${slug} has been deleted`,
        blog: blogDeleted,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
