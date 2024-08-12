import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import {
  loginPost,
  signUpPost,
  logoutGet,
} from "../controllers/userController.js";
import {  requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/signup", signUpPost);
router.post("/login", loginPost);
router.get("/logout", requireAuth,  logoutGet);

// Blog routes
router.get("/blogs", requireAuth, getAllBlogs);
router.get("/blogs/:id", requireAuth, getBlogById);
router.post("/blogs", requireAuth, createBlog);
router.put("/blogs/:id", requireAuth, updateBlog);
router.delete("/blogs/:id", requireAuth, deleteBlog);

export default router;
