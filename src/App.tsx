import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import Clipboard from './Assets/Clipboard.svg'
import logo from './Assets/Logo.svg'
import { Task } from './components/Task'
import { TaskCompleted } from './components/TaskCompleted'
import './Global.css'

export function App() {
  const [newTask, setNewTask] = useState('')
  const [currentTasks, setCurrentTasks] = useState([''])
  const [tasksCompleted, setTasksCompleted] = useState([''])
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  
  function handleNewTask(event:FormEvent) {
    event.preventDefault()
    setCurrentTasks([...currentTasks, newTask])
    setNumberOfTasks(numberOfTasks + 1)
    setNewTask('')
  }

  function handleNewChange(event:ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function deleteTask(content: string) {
    setNumberOfTasks(numberOfTasks - 1)
    const tasksWithoutCompletedOne = currentTasks.filter(t => {
      return t !== content  
    })
    setCurrentTasks(tasksWithoutCompletedOne)
  }

  function deleteFromTasksCompleted(content: string) {
    setNumberOfTasks(numberOfTasks - 1)
    const completedTasks = tasksCompleted.filter(t => {
      return t !== content
    })
    setTasksCompleted(completedTasks)
  }

  function handleTaskCompleted(content: string) {
    setTasksCompleted([...tasksCompleted, content])
    
    const tasksWithoutCompletedOne = currentTasks.filter(t => {
      return t !== content  
    })
    setCurrentTasks(tasksWithoutCompletedOne)
  }

  const newTaskIsEmpty = newTask.length === 0
  const tasksEmpty = numberOfTasks === 0
  const amountCompleted = tasksCompleted.length - 1

  return (
    <div>
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
          <button type="submit" disabled={newTaskIsEmpty}>Criar <span><PlusCircle size={18} /></span></button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.headerTasks}>
            <div className={styles.counter}>Tarefas criadas<span>{numberOfTasks}</span></div>
            <div className={styles.counter}>Concluídas<span>{amountCompleted} de {numberOfTasks}</span></div>
          </div>
          
          <div className={styles.tasksBox}>
            <div className={tasksEmpty ? styles.tasksEmpty : styles.tasksHasContent}>
              <img src={Clipboard} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p><span>Crie tarefas e organize seus itens a fazer</span></p>
            </div>
          </div>
        </div>
        
        {currentTasks.map((task, numberOfTasks) => {
            if(task == "") return
          return (
            <Task
              key={`${numberOfTasks}${task}`}  
              content={task}  
              deleteTask={deleteTask}
              handleTaskCompleted={handleTaskCompleted}
            />
          )
        })}

        {tasksCompleted.map(task => {
            if(task == "") return
          return (
            <TaskCompleted 
              key={`${numberOfTasks}${task}`}  
              content={task}
              deleteFromTasksCompleted={deleteFromTasksCompleted}
            />
          )
        })} 

      </main>
    </div>
  )
}