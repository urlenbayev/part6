import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Welcome to the anecdote app",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

let notificationTimeoutId;

export const { setNotification, clearNotification } =
  notificationSlice.actions;

export const showNotification = (message, seconds = 5) => (dispatch) => {
  clearTimeout(notificationTimeoutId);
  dispatch(setNotification(message));

  notificationTimeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
};

export default notificationSlice.reducer;
