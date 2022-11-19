import React, { useState } from "react";
import { deleteTask, updateTask } from "../redux/actions/index";
import { useDispatch } from "react-redux";
import "../App.css"

const Taskitem = (props) => {

  const [updateMode, setUpdateMode] = useState(false);
  const [text, setText] = useState(props.task.taskData);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateMode(prevState => !prevState);
    dispatch(updateTask(props.task._id, text));
  }

  const handleDelete = (e) => {
    dispatch(deleteTask(props.task._id));
  }

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <p className="card-text" style={{ display: updateMode ? "none" : "block" }}>{props.task.taskData}</p>
          <form onSubmit={ handleSubmit } style={{display: updateMode ? "block" : "none"}}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="edit-task" autoFocus={ true } />
          </form>
          <i className="fa-solid fa-pen-to-square mx-2 edit" onClick={() => setUpdateMode(prevState => !prevState)}/>
          <i className="fa-solid fa-trash-can mx-2 delete" onClick={handleDelete}/>
        </div>
      </div>
    </div>
  );
};

export default Taskitem;
