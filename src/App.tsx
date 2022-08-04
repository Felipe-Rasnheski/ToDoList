import { PlusCircle } from 'phosphor-react'
import styles from './App.module.css'
import Clipboard from './Assets/Clipboard.svg'
import logo from './Assets/Logo.svg'
import './Global.css'

export function App() {
  return (
    <div>
      <header className={styles.header}>
        <img src={logo} />
      </header>
      
      <main className={styles.container}>
        <form>
          <input type="text" placeholder='Adicione uma nova tarefa'></input>
          <button type="submit">Criar <span><PlusCircle size={18} /></span></button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.headerTasks}>
            <div className={styles.counter}>Tarefas criadas<span>0</span></div>
            <div className={styles.counter}>Concluídas<span>0</span></div>
          </div>
        </div>

        <div className={styles.tasksBox}>
          <div className={styles.tasksHasContent}>
            <img src={Clipboard} />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p><span>Crie tarefas e organize seus itens a fazer</span></p>
          </div>
        </div>
      </main>
    </div>
  )
}