import Container from "@mui/material/Container";
import CreatePost from "../../components/CreatePost/create-post-component";
import Posts from "../../components/Posts/posts-component";
import Header from "../../components/Header/header-component";

const MainPage = () => {
  return (
    <Container
      maxWidth="false"
      sx={{ maxWidth: "800px", background: "#FFFFFF", padding: "0 !important" }}
    >
      <Header />
      <CreatePost />
      <Posts />
    </Container>
  );
};

export default MainPage;
