import React, { useState, useEffect } from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Loading from "./util/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getNoteDetails, getNotes, searchNotes } from "../store/actions/notes";
// import { useSubscription, useQuery } from "urql";
// import { subscribeTodos, getTodosAndLabels, subscribeLabels } from "../gql";
import {
  TodosProvider,
  LabelsProvider,
  UiProvider,
  UserProvider,
  useUserStore,
  useTodosStore,
  useLabelsStore,
} from "../storeLocal";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { dark, light } from "../theme";

export default function ({ navigate }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState({
    data: {
      todos: [],
      labels: [],
      user: {},
    },
  });
  useEffect(() => {
    dispatch(getNotes()).then((res) => {
      console.log(res);
      setResult({ ...result, data: { ...result.data, todos: res } });
    });
  }, []);

  return (
    <MainComponent
      todos={result.data.todos}
      labels={result.data.labels}
      user={result.data.user}
    />
  );
}

function MainComponent({ todos, labels, user }) {
    console.log(todos);
  return (
    <>
      <TodosProvider todos={todos}>
        <LabelsProvider labels={labels}>
          <UserProvider user={user}>
            <UiProvider>
              <ThemeControlledComponent />
            </UiProvider>
          </UserProvider>
        </LabelsProvider>
      </TodosProvider>
    </>
  );
}

function ThemeControlledComponent() {
  const [{ isDarkMode }] = useUserStore();
  const [, dispatchTodo] = useTodosStore();
  const [, dispatchLabel] = useLabelsStore();
  const handleSubscribeTodos = (_, data) => {
    if (data && data.todoStream) {
      dispatchTodo({
        type: data.todoStream.action,
        payload: data.todoStream.todo,
      });
    }
  };
  const handleSubscribeLabels = (_, data) => {
    if (data && data.labelStream) {
      dispatchLabel({
        type: data.labelStream.action,
        payload: data.labelStream.todo,
      });
    }
  };
  // useSubscription({ query: subscribeTodos }, handleSubscribeTodos);
  // useSubscription({ query: subscribeLabels }, handleSubscribeLabels);
  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <AppBar />
      <NavDrawer />
      <Container maxWidth={false}>
        <Box mt={8}>
          <NotesArea />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
