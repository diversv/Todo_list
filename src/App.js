import './App.css';
import React from 'react';
import TodoInput from './Todoinput';
import TodoList from './TodoList';
import { nanoid } from "nanoid";
import uuid from "uuid";
import { useEffect, useState } from "react";
import Clock from './CurrentImage';
//import LoginForm from './LoginForm';
import {BrowserRouter as Router, Switch, Route, Routes, BrowserRouter} from "react-router-dom";

const App= () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const newuuid=nanoid();
  
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos,todo]);
      setTodo("");
    }
    console.log(todo);
  };

  const deleteTodo = (text) => {
    const newTodos = todos.filter((todo)=> {
      return todo !== text;
    });
    setTodos(newTodos);
    console.log(todo.id + ' deleted');
  };

  const handleChange = (e) => {
    setIsChecked(e.target.isChecked);
    console.log(e);
    console.log(e.target.checked);
  };

  const handleClick = (e) => {
    e.target.style.textDecoration = "line-through";
    e.target.classList.add("mystyle");
  }
  /*API calls*/
  // useEffect(() => {
  //   fetch('https://qsiuc8jzue.execute-api.us-west-2.amazonaws.com/items', {
  //     "method":"GET",
  //     "headers" :{

  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     setTodos(data);
  //   })
  // .catch((err) => {
  //   console.log(err.message);
  //   });
  // }, []);

  return (
    <div className="App">
      <h1>React Todo App</h1>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginForm/>} /> */}
          <Route exact path="/main" element={<div><Clock /> <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} checked={false} id={newuuid}  /><TodoList list={todos} onChange = {handleChange} remove = {deleteTodo} onClick={handleClick}/></div>} />
        </Routes>   
      </BrowserRouter>
      <Clock />
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList Checkbox list={todos} onChange = {handleChange} remove = {deleteTodo}  onClick={handleClick}/>
    </div>
  );
};

export default App;
