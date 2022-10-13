import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

function Todo({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  checkTodo,
  closeTodo,
}) {

    // useEffect(() => {
    //     console.log("look: "+JSON.stringify(todos));
    // }, [todos])
  const [edit, setEdit] = useState({
    odo_text: "",
    is_completed: true,
  });
  const [complete, setComplete] = useState({ is_completed: false });

  const submitUpdate = (todo_text) => {
    updateTodo(edit.id, todo_text);
    setEdit({
      id: null,
      todo_text: "",
      is_completed: true,
    }); 
    console.log(todo_text);
  };

  const submitComplete = (completed) => {
    completeTodo(complete.id, completed);
    setComplete({
      id: null,
      is_completed: 1,
    });
    console.log(completed);
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((data, index) => (
    <div
      className={data.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div
        key={data.id}
        onClick={() =>
          submitComplete({ id: data.id, complete: data.is_completed })
        }
      >
        {data.todo_text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(data.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: data.id, todo_text: data.todo_text })}
          className="edit-icon"
        />
        <BsCheckLg
          onClick={() => checkTodo(data.id)}
          className={data.isChecked ? "check-row checked" : "check-row"}
        />
        <GrClose
          onClick={() => closeTodo(data.id)}
          className={data.isClosed ? "check-row closed" : "check-row"}
        />
      </div>
    </div>
  ));
}

export default Todo;
