import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  postsList: [],
  selectedPost: {},
  isLoading: false,
  error: "",
};

//GET
export const getPostsFromServer = createAsyncThunk(
  "posts/getpostsFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8000/posts");
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No posts Found" });
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    addPostToList: (state, action) => {
      const id = Math.random() * 100;
      let post = { ...action.payload, id };
      state.postsList.push(post);
    },
    removePostFromList: (state, action) => {
      state.postsList = state.postsList.filter(
        (post) => post.id !== action.payload.id
      );
    },
    updatePostInList: (state, action) => {
      state.postsList = state.postsList.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPostsFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.postsList = action.payload;
      })
      .addCase(getPostsFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.postsList = [];
      });
  },
});

export const {
  addPostToList,
  removePostFromList,
  updatePostInList,
  setSelectedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
