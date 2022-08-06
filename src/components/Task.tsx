import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

interface TaskProps {
  content: string;
  deleteTask: (content: string) => void;
  handleTaskCompleted: (content: string) => void;
}

export function Task({content, deleteTask, handleTaskCompleted}:TaskProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChecked() {
    setIsChecked(!isChecked)
    handleTaskCompleted(content)
  }

  function removeTask() {
    deleteTask(content)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}>
          <Check className={isChecked == true ? styles.checked : styles.hidden}/>
        </div>
        <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
      </label>
      <p className={isChecked == true ? styles.textTask : styles.test}>{content}</p>
      <i className={styles.trash} onClick={removeTask}><Trash size={20} /></i>
    </div>
  )
}