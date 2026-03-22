import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./useNotificationContext";
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from "./requests";

let notificationTimeoutId;

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const anecdoteQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const showNotification = (message) => {
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: message,
    });

    clearTimeout(notificationTimeoutId);
    notificationTimeoutId = setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`anecdote '${createdAnecdote.content}' created`);
    },
    onError: (error) => {
      showNotification(error.message);
    },
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`anecdote '${updatedAnecdote.content}' voted`);
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  const handleCreate = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  if (anecdoteQuery.isLoading) {
    return <div>loading data...</div>;
  }

  if (anecdoteQuery.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = anecdoteQuery.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={handleCreate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
