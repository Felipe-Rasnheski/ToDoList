import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

interface CurrentTaskProps {
  task: {
    id: string
    content: string
  };
  handleDeleteFromCurrentTasks: (id: string) => void;
  handleNewTaskCompleted: (task: {id: string, content: string}) => void;
}

export function Task({task, handleDeleteFromCurrentTasks, handleNewTaskCompleted}:CurrentTaskProps) {
  const [isChecked, setIsChecked] = useState(false)
  
  function handleChecked() {
    setIsChecked(!isChecked)
    handleNewTaskCompleted(task)
  }

  function handleDeleteTask() {
    handleDeleteFromCurrentTasks(task.id)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}></div>
        <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
      </label>
      <p>{task.content}</p>
      <i className={styles.trash} onClick={handleDeleteTask}><Trash size={20} /></i>
    </div>
  )
}