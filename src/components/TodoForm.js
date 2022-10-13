import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      todo_text: input,
      is_completed: false,
    });

    setInput("");
    console.log(setInput);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="todo_text"
        placeholder="Add a todo"
        value={input}
        name="todo_text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">
        {props.edit ? "Edit todo" : "Add todo"}
      </button>
    </form>
  );
}

export default TodoForm;
