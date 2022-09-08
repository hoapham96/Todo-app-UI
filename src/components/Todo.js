import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import {BsCheckLg} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'

function Todo({getTodo, todos, completeTodo, removeTodo, updateTodo, checkTodo, closeTodo}) {
    
    const [edit, setEdit] = useState({
        todo_text: '', is_completed: false
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

    return getTodo.map((data, index)=>(
        <div
        className={data.isComplete ? 'todo-row complete' : 'todo-row'} 
        key={index}
        >
            <div key={data.id} onClick={() => completeTodo (data.id)}>
                {data.todo_text}
            </div>
            <div className="icons">
                <RiCloseCircleLine
                onClick={() => removeTodo(data.id)}
                className='delete-icon'
                />
                <TiEdit
                onClick={() => setEdit({id: data.id, value: data.todo_text})}
                className='edit-icon'
                />
                <BsCheckLg 
                onClick={() => checkTodo(data.id)}
                className={data.isChecked ? 'check-row checked' : 'check-row'}
                />
                <GrClose
                onClick={() => closeTodo(data.id)}
                className={data.isClosed ? 'check-row closed' : 'check-row'}
                />

            </div>
        </div>
        
    )) 
}

export default Todo
