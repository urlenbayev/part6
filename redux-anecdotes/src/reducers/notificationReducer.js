import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Welcome to the anecdote app",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

let notificationTimeoutId;

const { showNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, seconds) => (dispatch) => {
  clearTimeout(notificationTimeoutId);
  dispatch(showNotification(message));

  notificationTimeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, seconds * 1000);
};

export default notificationSlice.reducer;
