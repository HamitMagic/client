import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Tasks from './pages/tasks/Tasks'
import Calendar from 'react-calendar'
import Modal from './components/Modal'
import ApiService, { ITask } from './shared/API.service'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function App() {
  const [selectedDay, setSelectedDay] = React.useState<Value>(new Date());
  const [isModalShown, setModalShown] = React.useState(false);
  const [dayTaskList, setDayTaskList] = React.useState<ITask[]>([]);
  const [daysWithTasks, setDaysWithTasks] = React.useState<string[]>([]);

  async function fetchCalendar() {
    setDaysWithTasks(Object.keys(await ApiService.getCalendar()));
  }
  React.useEffect(() => {
    fetchCalendar();
  }, [daysWithTasks]);

  async function fetchTasks() {
    setDayTaskList(await ApiService.getTasks(selectedDay as Date))
  }
  React.useEffect(() => {
    fetchTasks(); // автоматический запрос на бэк для получания актуальных данных (цвет задачи не менятся изза этой строчки)
  }, [selectedDay,fetchTasks]);

  async function handleTaskStatus(taskID: number, status: boolean) {
    // await ApiService.updateTaskStatus(status,taskId);  // TODO BACKEND
    setDayTaskList((state) => {
      return state.map(task => {
        if (task.id === taskID) return {...task, completed:status}
        return task;
      })
    })
  }

  async function handleCalendarClick(event: Value) {
    setSelectedDay(event);
    setTimeout(() => {
      const eventAsDate = event as Date;
      if (!daysWithTasks.includes(
        `${eventAsDate.getFullYear()}-${eventAsDate.getMonth()+1}-${eventAsDate.getDate()}`
      )) {
        setModalShown(true)
        return
      }
    }, 500)
  }

  return(
    <React.Fragment>
      <Modal setDate={setSelectedDay} callback={fetchCalendar} date={selectedDay as Date} isShown={isModalShown} onClose={() => setModalShown(false)}/>
      <Calendar value={selectedDay} onChange={handleCalendarClick}  className='calendar'/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks handleTaskStatus={handleTaskStatus} callback={() => setModalShown(true)} taskList={dayTaskList}/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
