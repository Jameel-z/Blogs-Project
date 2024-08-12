import mongoose from "mongoose";

//define schema of the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

//create the model for the schema
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
