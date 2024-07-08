import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import MyVerticallyCenteredModal from "./UpdatePost";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedPost, removePostFromList } from "../slices/postsSlice";

import { getPostsFromServer } from "./../slices/postsSlice";

const PostsDisplay = () => {
  const { postsList } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const updatePost = (post) => {
    console.log("update post");
    setModalShow(true);
    dispatch(setSelectedPost(post));
  };

  useEffect(() => {
    dispatch(getPostsFromServer());
  }, [dispatch]);

  const deletePost = (post) => {
    console.log("delete Post");
    dispatch(removePostFromList(post));
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postsList &&
            postsList.map((post, index) => {
              return (
                <tr className="text-center" key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    <Button variant="primary" className="mx-3">
                      <i
                        className="bi bi-pencil-square"
                        onClick={() => updatePost(post)}
                      ></i>
                    </Button>
                    <Button variant="primary">
                      <i
                        className="bi bi-trash3"
                        onClick={() => deletePost(post)}
                      ></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default PostsDisplay;
