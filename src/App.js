import "./App.css";

import CreatePost from "./components/CreatePost";
import PageHeading from "./components/PageHeading";
import PostsDisplay from "./components/PostsDisplay";

import Container from "./../node_modules/react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container>
      <PageHeading />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <CreatePost />
          <PostsDisplay />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
