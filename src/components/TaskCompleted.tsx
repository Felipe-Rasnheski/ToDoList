import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './TaskCompleted.module.css';

interface TaskCompletedProps {
  content: string;
  handleDeleteFromTasksCompleted: (content: string) => void;
  handleRemoveCompleted: (content: string) => void;
}

export function TaskCompleted({ handleDeleteFromTasksCompleted, content, handleRemoveCompleted }:TaskCompletedProps) {
  const [isChecked, setIsChecked] = useState(true)

  function handleTaskNotComplete() {
    setIsChecked(!isChecked)
    handleRemoveCompleted(content)
  }

  function handleDeleteTask() {
    handleDeleteFromTasksCompleted(content)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}>
          <Check className={isChecked ? styles.checked : styles.hidden}/>
        </div>
        <input type="checkbox" checked={isChecked} onChange={handleTaskNotComplete}/>
      </label>
      <p className={isChecked ? styles.textTask : styles.test}>{content}</p>
      <i className={styles.trash} onClick={handleDeleteTask}><Trash size={20} /></i>
    </div>
  )
}