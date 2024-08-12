import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Design,
  DesignButton,
  DesignH2,
  DesignInput,
  DesignLabel,
  DesignSelect,
  DesignTextArea,
} from "./components/styles/Design.styled";

const Create = () => {
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [createdBy, setCreatedBy] = useState("");
  const [isPending, SetIsPending] = useState(false);

  // Use useEffect for authentication check and redirection
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {
      Navigate("/signup");
    }
  }, [Navigate]); // Dependency array ensures useEffect runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, snippet, body, author, createdBy };
    SetIsPending(true);

    axios
      .post("http://localhost:5000/blogs", blog, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        console.log("new blog added");
        SetIsPending(false);
        Navigate("/");
      })
      .catch((error) => {
        console.log("there was an error adding the blog", error);
        SetIsPending(false);
      });
  };

  return (
    <Design>
      <DesignH2>Add a New Blog</DesignH2>
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

        {!isPending && <DesignButton>Add Blog</DesignButton>}
        {isPending && <DesignButton disabled>Adding Blog...</DesignButton>}
      </form>
    </Design>
  );
};

export default Create;
