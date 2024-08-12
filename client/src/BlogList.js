import {
  BlogPreview,
  BlogTitle,
  BlogLink,
} from "./components/styles/Blog.Styled";

const BlogList = ({ blogs, title }) => {
  console.log(blogs);

  return (
    <div>
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <BlogPreview key={blog._id}>
          <BlogLink to={`/blogs/${blog._id}`}>
            <BlogTitle>{blog.title}</BlogTitle>
            <p>Written by {blog.author}</p>
          </BlogLink>
        </BlogPreview>
      ))}
    </div>
  );
};

export default BlogList;
