import './App.css';
import React, { useEffect, useState } from 'react';
import TodoInput from './Todoinput';
import TodoList from './TodoList';
import Clock from './CurrentImage';
import AuthForm from './AuthForm';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const API_URL = process.env.REACT_APP_API_URL;
  if (!API_URL) {
    console.error("API_URL is not defined. Check your .env file.");
  }
  //const navigate = useNavigate();
  /*
  // Add a new Todo
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { id: Date.now(), text: todo, isChecked: false }]);
      setTodo("");
    }
  };

  // Delete a Todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Start editing a Todo
  const editTodo = (id, text) => {
    setEditTodoId(id);
    setTodo(text);
  };

  // Update a Todo
  const updateTodo = () => {
    setTodos(
      todos.map((item) =>
        item.id === editTodoId ? { ...item, text: todo } : item
      )
    );
    setEditTodoId(null);
    setTodo("");
  };
 */
 
/*
  // Handle Login
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/main");
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
*/


//const API_URL = "https://yb0hqgl3pi.execute-api.us-west-2.amazonaws.com/prod/todos";

//fetch all TODOS from API
const fetchTodos = async () => {
  try {
    if (!isLoggedIn) {
      console.log("User is not logged in. Skipping fetchTodos.");
      return;
    }
    const response = await axios.get(`${API_URL}/todos`);
    console.log("Raw API response:", response.data); // Debugging

    // Handle the format where todos are in response.data.todos
    if (response.data.todos && Array.isArray(response.data.todos)) {
      setTodos(response.data.todos);
    } 
    // Handle the format where todos are stringified in response.data.body
    else if (response.data.body) {
      const parsedBody = JSON.parse(response.data.body);
      if (Array.isArray(parsedBody.todos)) {
        setTodos(parsedBody.todos);
      } else {
        console.error("Unexpected body format:", parsedBody);
        alert("Failed to fetch todos. Invalid response format.");
      }
    } 
    // Handle unexpected formats
    else {
      console.error("Unexpected response format:", response.data);
      alert("Failed to fetch todos. Invalid response format.");
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    alert("Failed to fetch todos. Please try again later.");
  }
};

useEffect(() => {
  if (isLoggedIn) {
    fetchTodos();
  }
}, [isLoggedIn]);

const addTodo = async () => {
  if (!todo.trim()) {
    alert("Todo cannot be empty.");
    return;
  }
  try {
    const newTodo = { id: Date.now(), text: todo.trim(), isChecked: false };
    const response = await axios.post(`${API_URL}/todos`, newTodo);
    const addedTodo = JSON.parse(response.data.body).item; // Parse the response body
    setTodos((prevTodos) => [...prevTodos, addedTodo]);
    setTodo(""); // Clear input after adding
    console.log("Added todo:", addedTodo);
  } catch (error) {
    console.error("Error adding todo:", error);
    alert("Failed to add todo. Please try again.");
  }
};


// Start editing a Todo
const editTodo = (id, text) => {
  if (!id || typeof id !== "string" && typeof id !== "number") {
    console.error("Invalid ID format:", id);
    return;
  }

  console.log("Editing todo with ID:", id); // Debugging
  setEditTodoId(id); // Set the current editing ID
  setTodo(text); // Populate the input with the current todo text
};

const updateTodo = async (id, text, isChecked = false) => {
  try {
    if (!id || typeof text === "undefined") {
      console.error("Invalid payload for update:", { id, text, isChecked });
      return;
    }

    const payload = {
      id: String(id), // Ensure id is a string
      text: text.trim(),
      isChecked,
    };

    // Construct the correct URL with the {id} path parameter
    const url = `${API_URL}/todos/${id}`;

    const response = await axios.put(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Raw API response:", response.data); // Debugging log

    // Parse the response body
    const responseBody =
      typeof response.data.body === "string"
        ? JSON.parse(response.data.body)
        : response.data.body;

    console.log("Parsed response body:", responseBody); // Debugging log

    // Extract updatedTodo from the response
    const rawUpdatedTodo = responseBody?.updatedTodo;

    if (!rawUpdatedTodo) {
      console.error("Updated todo is missing in the response:", responseBody);
      alert("Failed to update todo. Invalid response format.");
      return;
    }

    // Transform DynamoDB format into a plain object
    const updatedTodo = {
      id: rawUpdatedTodo.id.S,
      text: rawUpdatedTodo.text.S,
      isChecked: rawUpdatedTodo.isChecked.BOOL,
    };

    console.log("Formatted updated todo:", updatedTodo); // Debugging log

    // Update the state with the updated todo
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text: updatedTodo.text, isChecked: updatedTodo.isChecked }
          : todo
      )
    );

    console.log("Todos after update:", todos);
  } catch (error) {
    console.error("Error updating todo:", error);

    if (error.response) {
      console.error("Server error response:", error.response.data);
      alert(error.response.data.error || "Failed to update todo. Please try again.");
    } else {
      alert("Failed to update todo. Please check your network connection.");
    }
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    console.log("Deleting todo with ID:", id); // Debugging

    // Send the delete request to the API
    const response = await axios.delete(`${API_URL}/todos/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    // Update state to remove the deleted todo
    setTodos(todos.filter((todo) => todo.id !== id));

    console.log("Todo deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting todo:", error);
    alert("Failed to delete todo. Please try again.");
  }
};

// Toggle completion of a todo
const toggleTodo = (id) => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    updateTodo(id, todo.text, !todo.isChecked);
  }
};

useEffect(() => {
  fetchTodos();
}, []);

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

/*
  // Fetch todos from API
  useEffect(() => {
    fetch('https://qsiuc8jzue.execute-api.us-west-2.amazonaws.com/items', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedTodos = data.map(item => ({
          id: item.id || Date.now(),
          text: item.text || "Default text",
          isChecked: item.isChecked || false,
        }));
        setTodos(formattedTodos);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
*/
  return (
    <Router>
      <div className="App">
      <h1>React Todo App</h1>
        {isLoggedIn && (
          <Header onLogout={() => setIsLoggedIn(false)} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <AuthForm
                onLogin={() => setIsLoggedIn(true)}
              />
            }
          />
          <Route
            path="/main"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <MainApp
                  todos={todos}
                  todo={todo}
                  setTodo={setTodo}
                  addTodo={addTodo}
                  editTodoId={editTodoId}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                  toggleTodo={toggleTodo}
                  editTodo={editTodo}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="app-header">
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

const MainApp = ({
  todos,
  todo,
  setTodo,
  addTodo,
  editTodoId,
  updateTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
}) => {
  return (
    <div>
      <Clock />
      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        editTodoId={editTodoId}
        updateTodo={updateTodo}
      />
      <TodoList
        list={todos}
        remove={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  );
};

export default App;