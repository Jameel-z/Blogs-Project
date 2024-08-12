import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Design,
  DesignButton,
  DesignH2,
  DesignInput,
  DesignLabel,
  DesignSelect,
  DesignTextArea,
} from "./components/styles/Design.styled";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setBlog(data);
        setTitle(data.title);
        setSnippet(data.snippet);
        setBody(data.body);
        setAuthor(data.author);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const cancelButton = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, snippet, body, author };

    setIsPending(true);

    axios
      .put(`http://localhost:5000/blogs/${id}`, updatedBlog, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        console.log("Blog was edited");
        setIsPending(false);
        navigate(`/blogs/${id}`);
      })
      .catch((err) => {
        console.error("error aupdating blog:", err);
        setIsPending(false);
      });
  };

  return (
    <Design>
      <DesignH2>Edit Blog</DesignH2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form onSubmit={handleSubmit}>
          <DesignLabel>Blog title:</DesignLabel>
          <DesignInput
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <DesignLabel>Blog snippet:</DesignLabel>
          <DesignInput
            type="text"
            required
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
          />

          <DesignLabel>Blog body:</DesignLabel>
          <DesignTextArea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></DesignTextArea>

          <DesignLabel>Blog author:</DesignLabel>
          <DesignSelect
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">mario</option>
            <option value="yoshi">yoshi</option>
          </DesignSelect>
          <DesignButton onClick={() => cancelButton()}>Cancel</DesignButton>
          {!isPending && <DesignButton>Save Changes</DesignButton>}
          {isPending && <DesignButton disabled>Saving Changes...</DesignButton>}
        </form>
      )}
    </Design>
  );
};

export default EditBlog;
