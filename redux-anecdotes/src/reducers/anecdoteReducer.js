import { createSlice } from "@reduxjs/toolkit";

const sortByVotes = (anecdotes) =>
  [...anecdotes].sort((first, second) => second.votes - first.votes);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;

      return sortByVotes(
        state.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      );
    },
    createAnecdote(state, action) {
      return sortByVotes([...state, action.payload]);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload);
    },
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
