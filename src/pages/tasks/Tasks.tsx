import React from 'react'
import 'react-calendar/dist/Calendar.css';
import ApiService, { ITask } from '../../shared/API.service';

interface IProps {
    taskList: ITask[];
    callback: () => void;
    handleTaskStatus: (id:number,status:boolean) => void;
}

function Tasks(props: IProps) {

    function handleTaskChange(event: React.ChangeEvent<HTMLInputElement>, taskID?: number) {
        if (taskID) props.handleTaskStatus(taskID, event.target.checked)
    }

    async function deleteTask(id: number|undefined) {
        if (typeof(id) === 'number') await ApiService.deleteTask(id);
    }
    return (
        <main className='content'>
            <button type='button' className='new-task' onClick={props.callback}>Создать Задачу</button>
            <ol>
            {props.taskList.map((task) => {
                return (
                    <li key={task.id} className={task.completed===false ? 'not-complete' : 'complete'}>
                        <svg width='20' height='20' onClick={() => deleteTask(task.id)}>
                            <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input type='checkbox'  onChange={(e) =>handleTaskChange(e,task.id)} />
                        <span>{task.title}</span>
                    </li>
                )
            })}
            </ol>
        </main>
    )
}

export default Tasks
