import React, {useState} from 'react'
import TodoForm from '../TodoForm'
import Todo from '../Todo'


function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos =[todo, ...todos];
        
        setTodos(newTodos);
        console.log(todo);
    }   

    const updateTodo =(todoId, newValue) => {
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
