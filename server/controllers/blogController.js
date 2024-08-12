import Blog from "../models/blogModel.js";
import jwt from "jsonwebtoken";

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.jwt, "my own secret to hash");
    const id = decodedToken.id;

    const blogs = await Blog.find({ createdBy: id });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.jwt, "my own secret to hash");
    const id = decodedToken.id;
    // get blog from databse with id == req.params.id
    // compare id of user with createdby id
    // update or roll back

    const thisBlog = await Blog.findById(req.params.id);

    const sameUser = thisBlog.createdBy.toString() === id;
    if (sameUser) {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } else {
      console.log("not same user who created this blog asking for it");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  let { title, snippet, body, author, createdBy } = req.body;

  //get the createdBy value from token
  const decodedToken = jwt.decode(req.cookies.jwt, "my own secret to hash");
  createdBy = decodedToken.id;
  try {
    const newBlog = new Blog({
      title,
      snippet,
      body,
      author,
      createdBy,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.jwt, "my own secret to hash");
    const id = decodedToken.id;
    // get blog from databse with id == req.params.id
    // compare id of user with createdby id
    // update or roll back

    const thisBlog = await Blog.findById(req.params.id);

    const sameUser = thisBlog.createdBy.toString() === id;
    console.log(thisBlog.createdBy, id);

    if (sameUser) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(updatedBlog);
    } else {
      console.log("not same usr trying to edit ");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.jwt, "my own secret to hash");
    const id = decodedToken.id;
    // get blog from databse with id == req.params.id
    // compare id of user with createdby id
    // update or roll back

    const thisBlog = await Blog.findById(req.params.id);

    const sameUser = thisBlog.createdBy.toString() === id;
    console.log(thisBlog.createdBy, id);
    if (sameUser) {
      const result = await Blog.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(204).end();
    } else {
      console.log("not same user who created it trying to delete");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
