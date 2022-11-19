import * as actionTypes from "../actions/type";

export const tasksReducers = (state = [], action) => {
    
    switch (action.type) {
        case actionTypes.ADDNEW_TASK:
            return [action.payload, ...state];
        case actionTypes.GETALL_TASK:
            return action.payload;
        case actionTypes.UPDATE_TASK:
            return state.map(task => (task._id === action.payload.task._id ? { ...task, taskData: action.payload.task.taskData } : task))
        case actionTypes.DELETE_TASK:
            return state.filter(task => (task._id !== action.payload.task._id))
        default:
            return state;
    }
} 