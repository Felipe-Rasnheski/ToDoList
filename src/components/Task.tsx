import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

interface TaskProps {
  content: string;
  handleDeleteFromCurrentTasks: (content: string) => void;
  handleNewTaskCompleted: (content: string) => void;
}

export function Task({content, handleDeleteFromCurrentTasks, handleNewTaskCompleted}:TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChecked() {
    setIsChecked(!isChecked)
    handleNewTaskCompleted(content)
  }

  function handleDeleteTask() {
    handleDeleteFromCurrentTasks(content)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}>
          <Check className={isChecked ? styles.checked : styles.hidden}/>
        </div>
        <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
      </label>
      <p className={isChecked ? styles.textTask : styles.test}>{content}</p>
      <i className={styles.trash} onClick={handleDeleteTask}><Trash size={20} /></i>
    </div>
  )
}