import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import Auth from '../utils/auth';


function TodoForm(props) {
    const [input, setInput]= useState("")
    const [formState, setFormState] = useState({todo_text: '', is_completed: false})

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value)

        const { name, value } = e.target;

        setFormState({
        ...formState,
        [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            todo_text: input,
            is_completed: false
        })

        setInput("")
        console.log(setInput);
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + Auth.getToken()
            }
          }
          console.log(config);
          console.log(formState);
        axios.post(`http://localhost:3001/api/v1/todos/`, formState, config )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    
    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <input
            type='todo_text'
            placeholder= 'Add a todo'
            value={input}
            name='todo_text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
            />
            <button className='todo-button'>{props.edit? 'Edit todo' : 'Add todo'} </button>
        </form>
    )
}

export default TodoForm
