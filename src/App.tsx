import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import Clipboard from './Assets/Clipboard.svg'
import logo from './Assets/Logo.svg'
import { Task } from './components/Task'
import { TaskCompleted } from './components/TaskCompleted'
import './Global.css'

interface TasksProps {
  id: string
  content: string
}

export function App() {
  const [newTask, setNewTask] = useState('')
  const [currentTasks, setCurrentTasks] = useState<TasksProps[]>([])
  const [tasksCompleted, setTasksCompleted] = useState<TasksProps[]>([])
  const [numberOfTasks, setNumberOfTasks] = useState(0)

  function handleNewChange(event:ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }
  
  function handleNewTask(event:FormEvent) {
    event.preventDefault()

    const handleNewTask = {
      id: String(numberOfTasks + 1),
      content: newTask
    }

    setCurrentTasks([...currentTasks, handleNewTask])
    setNumberOfTasks(numberOfTasks + 1)
    setNewTask('')
    setLocalStorageCurrentTasks([...currentTasks, handleNewTask])
  }

  function handleNewTaskCompleted(task: TasksProps) {
    setTasksCompleted([...tasksCompleted, task])
    setLocalStorageCompletedTasks([...tasksCompleted, task])

    const tasksWithoutCompletedOne = currentTasks.filter(t => {
      return t.id !== task.id  
    })
    setCurrentTasks(tasksWithoutCompletedOne)
    setLocalStorageCurrentTasks(tasksWithoutCompletedOne)
  }

  function handleDeleteFromCurrentTasks(id: string) {
    setNumberOfTasks(numberOfTasks - 1)

    const tasksWithoutDeletedOne = currentTasks.filter(t => {
      return t.id !== id  
    })
    setCurrentTasks(tasksWithoutDeletedOne)
    setLocalStorageCurrentTasks(tasksWithoutDeletedOne)
  }

  function handleDeleteFromTasksCompleted(id: string) {
    setNumberOfTasks(numberOfTasks - 1)

    const completedTasks = tasksCompleted.filter(t => {
      return t.id !== id
    })
    setTasksCompleted(completedTasks)
    setLocalStorageCompletedTasks(completedTasks)
  }

  function handleRemoveCompleted(task: TasksProps) {
    setCurrentTasks([...currentTasks, task])
    setLocalStorageCurrentTasks([...currentTasks, task])

    const tasksWithoutUncompletedOne = tasksCompleted.filter(t => {
      return t.id !== task.id
    })
    setTasksCompleted(tasksWithoutUncompletedOne)
    setLocalStorageCompletedTasks(tasksWithoutUncompletedOne)
  }

  function getLocalStorage() {
    // @ts-ignore
    const storageCurrentTasks = JSON.parse(localStorage.getItem('currentTasks'))
    if(storageCurrentTasks == null) return
    setCurrentTasks(storageCurrentTasks)
    setNumberOfTasks(storageCurrentTasks.length)

    // @ts-ignore
    const storageCompletedTasks = JSON.parse(localStorage.getItem('tasksCompleted'))
    if(storageCompletedTasks == null) return
    setTasksCompleted(storageCompletedTasks)
    setNumberOfTasks(storageCurrentTasks.length + storageCompletedTasks.length)

    // @ts-ignore
    const localStorageReset = JSON.parse(localStorage.getItem('reset'))
    if(localStorageReset != null) {
      setReset(localStorageReset)
    }

    // @ts-ignore
    const Day = JSON.parse(localStorage.getItem('day'))
    if(Day == null) return
    if(dayOfNow == 1) {
      localStorage.setItem('day', JSON.stringify(0))
    }
    
    if(Day != dayOfNow && reset) {
      setCurrentTasks([...currentTasks, ...tasksCompleted])
      setTasksCompleted([]) 
    }
  }

  function setLocalStorageCurrentTasks(newCurrentTasks: TasksProps[]) {
    const current = JSON.stringify(newCurrentTasks)
    localStorage.setItem('currentTasks', current)

    localStorage.setItem('day', JSON.stringify(dayOfNow))
  }

  function setLocalStorageCompletedTasks(newCompletedTasks: TasksProps[]) {
    const completed = JSON.stringify(newCompletedTasks)
    localStorage.setItem('tasksCompleted', completed)
  }

  function setIfReset(reset: boolean) {
    localStorage.setItem('reset', JSON.stringify(reset))
  }

  const inputForNewTaskIsEmpty = newTask.length === 0
  const taskContainerIsEmpty = numberOfTasks === 0
  const amountCompleted = tasksCompleted.length
  const [reset, setReset] = useState(false)

  let date = new Date()
  let dayOfNow = date.getDate()
  let hoursForReset = 23 - date.getHours()
  let minutesForReset = 59 - date.getMinutes()

  return (
    <div onLoad={getLocalStorage}>
      <header className={styles.header}>
        <img src={logo} />
      </header>
      
      <main className={styles.container}>
        <form onSubmit={handleNewTask}>
          <input 
            type="text" placeholder='Adicione uma nova tarefa'
            spellCheck={false}
            value={newTask} onChange={handleNewChange}>
          </input>
          <button type="submit" disabled={inputForNewTaskIsEmpty}>Criar <span><PlusCircle size={18} /></span></button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.headerTasks}>
            <div className={styles.counter}>Tarefas criadas<span>{numberOfTasks}</span></div>
            <div className={styles.counter}>Concluídas<span>{amountCompleted} de {numberOfTasks}</span></div>
          </div>
          
          <div className={styles.tasksBox}>
            <div className={taskContainerIsEmpty ? styles.tasksEmpty : styles.tasksHasContent}>
              <img src={Clipboard} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p><span>Crie tarefas e organize seus itens a fazer</span></p>
            </div>
          </div>
        </div>
        
        {currentTasks.map((task) => {
          return (
            <Task
              key={task.id}  
              task={task}  
              handleDeleteFromCurrentTasks={handleDeleteFromCurrentTasks}
              handleNewTaskCompleted={handleNewTaskCompleted}
            />
          )
        })}

        {tasksCompleted.map((task) => {
          return (
            <TaskCompleted 
              key={task.id}  
              task={task}
              handleDeleteFromTasksCompleted={handleDeleteFromTasksCompleted}
              handleRemoveCompleted={handleRemoveCompleted}
            />
          )
        })} 
        
        <div className={`${taskContainerIsEmpty ? styles.hidden : styles.show} ${reset ? styles.colorWhite : styles.nothing}`}>
          <div>
            <label>
              <span 
              className={`${styles.resetDaily} ${reset ? styles.checked : styles.disabled}`}>
              </span>
              <input 
              className={styles.hidden} 
              type="checkbox" checked={reset} 
              onChange={() => {setReset(!reset); 
              setIfReset(!reset)}} 
            />
            </label>  
            Resetar as tarefas diariamente
          </div>
          <div>Reseta em<strong>{hoursForReset}h {minutesForReset}m</strong></div>
        </div>
      </main>
    </div>
  )
}