import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   mode: 'light',
   user: null,
   token: null,
   posts: [],
};

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setMode: (state) => {
         state.mode = state.mode === 'light' ? 'dark' : 'light';
      },
      setLogin: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
      },
      setLogout: (state) => {
         state.user = null;
         state.token = null;
      },

      setFollowers: (state, action) => {
         if (state.user) {
            state.user.followers = action.payload.followers;
         } else {
            console.error('user followers non-existent :(');
         }
      },
      setFollowings: (state, action) => {
         if (state.user) {
            state.user.followings = action.payload.followings;
         } else {
            console.error('user following non-existent :(');
         }
      },
      setPosts: (state, action) => {
         state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
         const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id)
               return action.payload.post;
            return post;
         });
         state.posts = updatedPosts;
      },
   },
});

export const {
   setMode,
   setLogin,
   setLogout,
   setFollowers,
   setFollowings,
   setPosts,
   setPost,
} = authSlice.actions;
export default authSlice.reducer;
