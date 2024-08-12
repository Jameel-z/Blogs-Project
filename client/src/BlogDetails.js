import { useNavigate, useParams } from "react-router-dom";
import useAxios from "./useAxios";
import axios from "axios";
import { Blogdetails } from "./components/styles/Blog.Styled";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, error, isPending } = useAxios(
    "http://localhost:5000/blogs/" + id
  );
  const navigate = useNavigate();

  const handleClick = () => {
    axios
      .delete(`http://localhost:5000/blogs/${id}`, { withCredentials: true })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("there was an error deleting the blog:", error);
      });
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <Blogdetails>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isPending && data && (
        <article>
          <h2>{data.title}</h2>
          <p>Written by {data.author}</p>
          <div>{data.body}</div>
          <button onClick={handleClick}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </article>
      )}
    </Blogdetails>
  );
};

export default BlogDetails;
