import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useSelector, useDispatch } from "react-redux";
import { updatePostInList } from "../slices/postsSlice";

const MyVerticallyCenteredModal = (props) => {
  const { selectedPost } = useSelector((state) => state.posts);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [id, setId] = useState(0);
  const dispatch = useDispatch();

  const updatePost = () => {
    props.onHide();
    dispatch(updatePostInList({ id, title, description }));
  };

  useEffect(() => {
    if (Object.keys(selectedPost).length !== 0) {
      setTitle(selectedPost.title);
      setDescription(selectedPost.description);
      setId(selectedPost.id);
    }
  }, [selectedPost]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPostTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPostDescription">
            <Form.Label>Post Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Post Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => updatePost(e)}
          >
            Update Post
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
