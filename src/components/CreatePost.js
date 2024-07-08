import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { addPostToList } from "../slices/postsSlice";
import { useDispatch } from "react-redux";

const CreatePost = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = () => {
    if (validationError) {
      setValidationError(null);
    }
  };

  const addPost = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setValidationError("Title and description are required.");
      setSuccessMessage(null); // Clear success message if there's a validation error
      return;
    }

    try {
      // If validation passes, dispatch the action and reset the form fields
      dispatch(addPostToList({ title, description }));
      setSuccessMessage("Post added successfully!");
      setTitle("");
      setDescription("");
      setValidationError(null);
    } catch (error) {
      setSuccessMessage(null);
      setValidationError("Failed to add post. Please try again later.");
    }
  };

  return (
    <section className="my-5">
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicPostTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Create Post Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleInputChange();
            }}
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

        <div className="text-end">
          <Button variant="primary" type="submit" onClick={(e) => addPost(e)}>
            Add Post
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default CreatePost;
