import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../redux/actions/index";

const Addtask = (props) => {

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTask(text));
    setText("");
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  return (
    <div className="container">
      <h3 className="mt-1">Add Task</h3>
      <form className="my-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="task"
            name="task"
            value={text}
            aria-describedby="emailHelp"
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <button disabled={text.length < 5} type="submit" className="btn btn-primary">
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addtask;
