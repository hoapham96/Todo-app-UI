import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import Auth from '../utils/auth';
import axios from "axios";



function TodoList() {
    const [todos, setTodos] = useState([]);
    const [ data, setData ] = useState([]);
    // const [formState, setFormState] = useState({todo_text: '', is_completed: false})


    let config = {
        headers: {
          'Authorization': 'Bearer ' + Auth.getToken()
        }
      }

    useEffect(() => {
        getTodo()
    },[] 
    );
    

    const getTodo = () => {
        axios.get(`http://localhost:3001/api/v1/todos/`, config )
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err));
    }

    const addTodo = (todo) => {
        
        if(!todo.todo_text || /^\s*$/.test(todo.todo_text)) {
            return;
        }
        // const 
        // const { name, value } = e.target.input;

        // setFormState({
        // ...formState,
        // [name]: value,
        // })
        // axios.post(`http://localhost:3001/api/v1/todos/`,formState, config )
        //     .then((res) => {
        //     })
        //     .catch((err) => console.log(err));

       
        const newTodos =[todo, ...todos];
        setTodos(newTodos);
        console.log(newTodos);
    }   

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        console.log(todoId);
    }

    const removeTodo = id => {
        const removeArr =[...todos].filter(todo => todo.id !== id);
        
        setTodos(removeArr)
    }

    const completeTodo = id =>{
        let updatedTodos = todos.map(todo =>{
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updatedTodos);
    }

    const checkTodo = id => {
        const checkedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isChecked = !todo.isChecked;
                todo.isClosed = false
            }
            return todo
        })
        setTodos(checkedTodos)
    }

    const closeTodo = id => {
        const closedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isClosed = !todo.isClosed;
                todo.isChecked = false
            }
            return todo
        })
        setTodos(closedTodos)
    }

    return (
        <div>
           <h1>What's the Plan for Today?</h1>
           <TodoForm onSubmit={addTodo} />
           <Todo 
                getTodo={data}
                todos={todos} 
                completeTodo={completeTodo} 
                checkTodo={checkTodo} 
                removeTodo={removeTodo} 
                updateTodo={updateTodo}
                closeTodo={closeTodo}
            />
        </div>
    )
}

export default TodoList
