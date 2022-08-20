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
        <Check className={styles.checked}/>
        <input type="checkbox" checked={isChecked} onChange={handleTaskNotComplete}/>
      </label>
      <p>{content}</p>
      <i className={styles.trash} onClick={handleDeleteTask}><Trash size={20} /></i>
    </div>
  )
}