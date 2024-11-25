import axios from "axios";

export interface ITask {
    title: string;
    date: Date;
    id?: number;
    completed?: boolean;
}
const API = 'http://localhost:4000';

export default class ApiService {
    static async getTasks(date: Date) {
        const response = await axios.get(`${API}/tasks`, {
            params: {
                date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            }
        })
        return response.data
    }
    static async getCalendar() {
        const response = await axios.get(`${API}/calendar`);
        return response.data;
    }

    static async createTask(task: ITask) {
        const response = await axios.post(`${API}/tasks`, {
            ...task,
            date: `${task.date.getFullYear()}-${task.date.getMonth()+1}-${task.date.getDate()}`,
        });
        return response.data
    }

    static async deleteTask(id:number) {
        const response = await axios.delete(`${API}/tasks/${id}`);
        return response
    }
}