import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Auth from "../utils/auth";
import axios from "axios";
import { GrLogin } from "react-icons/gr";

function TodoList() {
  const [todos, setTodos] = useState([]);

  let config = {
    headers: {
      Authorization: "Bearer " + Auth.getToken(),
    },
  };

  useEffect(() => {
    getTodo();
  }, []);


  const getTodo = () => {
    axios
      .get(`http://localhost:3001/api/v1/todos/`, config)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addTodo = async (todo) => {
    const result = await axios.post(`http://localhost:3001/api/v1/todos/`, todo, config)
    getTodo()

    // setTodos([...todos, result.data])
  };

  const updateTodo = async (id, value) => {
    console.log(value);
    const updatedTodo = await axios.put(`http://localhost:3001/api/v1/todos/${id}`, value, config)

    setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo.data : todo ))
    console.log(todos);
  };

  const removeTodo = async (id) => {
    const remove = await axios.delete(`http://localhost:3001/api/v1/todos/${id}`, config)
    var list = todos.filter(todo => {
        return todo.id !=id;
    })
    setTodos(list)
  };

  const completeTodo = (id, completed) => {
    console.log(id);
    console.log(completed);
    let updatedTodos = todos.map((completed) => {
      if (completed.id === id) {
        completed.is_completed = 1;
      }
      return completed;
    });
    console.log(updatedTodos);
    axios
      .put(`http://localhost:3001/api/v1/todos/${id}`, updatedTodos, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    // let updatedTodos = data.map(item =>{
    //     if (item.id === id) {
    //         item.is_completed = !item.is_completed;
    //     }
    //     return item;
    // })
    // console.log(updatedTodos);
    // setData(updatedTodos);
  };

//   const checkTodo = (id) => {
//     const checkedTodos = todos.map((todo) => {
//       if (todo.id === id) {
//         todo.isChecked = !todo.isChecked;
//         todo.isClosed = false;
//       }
//       return todo;
//     });
//     setTodos(checkedTodos);
//   };

  const closeTodo = (id) => {
    const closedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isClosed = !todo.isClosed;
        todo.isChecked = false;
      }
      return todo;
    });
    setTodos(closedTodos);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        // checkTodo={checkTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        closeTodo={closeTodo}
      />
    </div>
  );
}

export default TodoList;
