import Navbar from "./components/Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import EditBlog from "./EditBlog";
import Signup from "./Signup";
import Login from "./Login";
import GlobalStyle from "./components/styles/GlobalStyles";
import { Content } from "./components/styles/Content.styled";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/blogs/:id" element={<BlogDetails />}></Route>
            <Route path="/edit/:id" element={<EditBlog />}></Route>
            <Route path="404" element={<NotFound />}></Route>
          </Routes>
        </Content>
      </Router>
    </ThemeProvider>
  );
}

export default App;
