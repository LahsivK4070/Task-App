import { ADDNEW_TASK, GETALL_TASK, UPDATE_TASK, DELETE_TASK } from "./type";

const API_URL = "http://localhost:5000";

export const addNewTask = (taskData) => async (dispatch) => {

    const res = await fetch(`${API_URL}/api/task/addtask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({taskData})
    });
    const json = await res.json();
    dispatch({ type: ADDNEW_TASK, payload: json });

}

export const getAllTask = () => async (dispatch) => {
    const res = await fetch(`${API_URL}/api/task/fetchtasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    });

    const json = await res.json();
    dispatch({ type: GETALL_TASK, payload: json });
}

export const updateTask = (id, taskData) => async (dispatch) => {
    const res = await fetch(`${API_URL}/api/task/updatetask/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({taskData})
    });
    const json = await res.json();
    dispatch({ type: UPDATE_TASK, payload: json });
}

export const deleteTask = (id) => async (dispatch) => {
    const response = await fetch(`${API_URL}/api/task/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    });
    const json = await response.json();
    dispatch({ type: DELETE_TASK, payload: json });
}