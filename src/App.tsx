import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import Clipboard from './Assets/Clipboard.svg'
import logo from './Assets/Logo.svg'
import { Task } from './components/Task'
import './Global.css'

let hasContent = false
let numberOfTasksCreated = 0

export function App() {
  const [newTask, setNewTask] = useState('')
  const [currentTasks, setCurrentTasks] = useState([""])

  function handleNewTask(event:FormEvent) {
    event.preventDefault()
    setCurrentTasks([...currentTasks, newTask])
    numberOfTasksCreated++
    setNewTask('')
  }

  function handleNewChange(event:ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function deleteTask(content: string[]) {
    numberOfTasksCreated--
    setCurrentTasks(content)
  }

  const newTaskIsEmpty = newTask.length === 0
  const tasksEmpty = currentTasks.length > 1

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
            <div className={styles.counter}>Tarefas criadas<span>{numberOfTasksCreated}</span></div>
            <div className={styles.counter}>Concluídas<span>{numberOfTasksCreated} de {}</span></div>
          </div>
          
          <div className={styles.tasksBox}>
            <div className={tasksEmpty ? styles.tasksHasContent : styles.tasksEmpty}>
              <img src={Clipboard} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p><span>Crie tarefas e organize seus itens a fazer</span></p>
            </div>
          </div>
        </div>
        
        
        {currentTasks.map(task => {
            if(task == "") return
          return (
            <Task 
              key={`${numberOfTasksCreated}${task}`} 
              test={`${numberOfTasksCreated}${task}`} 
              content={task} 
              currentTasks={currentTasks} 
              deleteTask={deleteTask} 
            />
          )
        })}
        
      </main>
    </div>
  )
}