import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    decs: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
    },
    user: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
      default: "",
      required: true,
    },
    data: {
      type: String,
      default: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
    },
  },
  {
    timestamps: true,
  }
);

export default model("blog", blogSchema);
