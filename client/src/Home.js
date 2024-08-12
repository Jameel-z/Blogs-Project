import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BlogList from "./BlogList";
import useAxios from "./useAxios";
import Cookies from "js-cookie";

const Home = () => {
  const Navigate = useNavigate();

  // Use useEffect for authentication check and redirection
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {
      Navigate("/signup");
    }
  }, []);

  const {
    data: blogs,
    isPending,
    error,
  } = useAxios("http://localhost:5000/blogs");
  return (
    <div className="home">
      {error && <div>{error.message}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
