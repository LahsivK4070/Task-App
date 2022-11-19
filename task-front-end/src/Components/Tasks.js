import React, { useEffect } from "react";
import { getAllTask } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Addtask from "./Addtask";
import Taskitem from "./Taskitem";
// import { useNavigate } from "react-router-dom";
import "../App.css";

const Tasks = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTask());
  }, [])

  const tasks = useSelector(state => state.tasks);

  return (
    <>
      <Addtask showAlert={props.showAlert} />
        <h1 className="task-heading mt-3 md-3">Your Tasks</h1>
        <div className="row">
          <div className="container">
            {tasks.length === 0 && "No tasks to do. Add something"}
          </div> 
          {tasks.map((task) => {
            return (
              <Taskitem
                key={task._id}
                task={task}
                showAlert={props.showAlert}
              />
            )
          })}
      </div>
    </>
  );
};

export default Tasks;
