import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import {BsCheckLg} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'

function Todo({todos, completeTodo, removeTodo, updateTodo, checkTodo, closeTodo}) {
    
    
    const [edit, setEdit] = useState({
        id: null, 
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }


    if (edit.id)  {
        return < TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos.map((todo, index)=>(
        <div
        className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
        key={index}
        >
            <div key={todo.id} onClick={() => completeTodo (todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
                <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className='delete-icon'
                />
                <TiEdit
                onClick={() => setEdit({id: todo.id, value: todo.text})}
                className='edit-icon'
                />
                <BsCheckLg 
                onClick={() => checkTodo(todo.id)}
                className={todo.isChecked ? 'check-row checked' : 'check-row'}
                />
                <GrClose
                onClick={() => closeTodo(todo.id)}
                className={todo.isClosed ? 'check-row closed' : 'check-row'}
                />

            </div>
        </div>
        
    )) 
}

export default Todo
