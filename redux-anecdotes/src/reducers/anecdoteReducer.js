import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sortByVotes = (anecdotes) =>
  [...anecdotes].sort((first, second) => second.votes - first.votes);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return sortByVotes([...state, action.payload]);
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload);
    },
    replaceAnecdote(state, action) {
      return sortByVotes(
        state.map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote,
        ),
      );
    },
  },
});

const { appendAnecdote, setAnecdotes, replaceAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch(replaceAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
