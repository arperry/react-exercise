import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import TodoList from "./components/todolist/TodoList";
import UserForm from "./components/userform/UserForm";

export function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        theme="dark"
      />
      <Layout>
        <Routes>
          <Route path="/make-todo" element={<UserForm />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </Layout>
    </MantineProvider>
  );
}

export default App;
