import React from "react";

import { useSelector } from "react-redux";

const PageHeading = () => {
  const { error } = useSelector((state) => state.posts);

  return (
    <>
      <h1 className="text-center my-4 text-primary">Create And Edit Posts</h1>

      {error !== "" ? <p className="text-center text-danger">{error}</p> : null}
    </>
  );
};

export default PageHeading;
