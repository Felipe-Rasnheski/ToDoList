import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './TaskCompleted.module.css';

interface TaskCompletedProps {
  task: {
    id: string,
    content: string
  };
  handleRemoveCompleted: (task: {id: string, content: string}) => void;
  handleDeleteFromTasksCompleted: (id: string) => void;
}

export function TaskCompleted({ task, handleRemoveCompleted, handleDeleteFromTasksCompleted }:TaskCompletedProps) {
  const [isChecked, setIsChecked] = useState(true)

  function handleTaskNotComplete() {
    setIsChecked(!isChecked)
    handleRemoveCompleted(task)
  }

  function handleDeleteTask() {
    handleDeleteFromTasksCompleted(task.id)
  }

  return (
    <div className={styles.task}>
      <label>
        <Check className={styles.checked}/>
        <input type="checkbox" checked={isChecked} onChange={handleTaskNotComplete}/>
      </label>
      <p>{task.content}</p>
      <i className={styles.trash} onClick={handleDeleteTask}><Trash size={20} /></i>
    </div>
  )
}