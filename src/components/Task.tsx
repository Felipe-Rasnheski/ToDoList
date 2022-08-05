import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

interface TaskProps {
  content: string;
  currentTasks: string[];
  deleteTask: (content: string[]) => void;
  test: string;
}

export function Task({content, currentTasks, deleteTask, test}:TaskProps) {
  const [isChecked, setChecked] = useState(false);
  
  function handle() {
    setChecked(!isChecked)
  }

  function deletetask() {
    const tasksWithoutDeleteOne = currentTasks.filter(task => { 
      return task !== content
    })

    deleteTask(tasksWithoutDeleteOne)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}>
          <Check className={isChecked == true ? styles.checked : styles.hidden}/>
        </div>
        <input type="checkbox" checked={isChecked} onChange={handle}/>
      </label>
      <p className={isChecked == true ? styles.textTask : styles.test}>{content}</p>
      <i className={styles.trash} onClick={deletetask}><Trash size={20} /></i>
    </div>
  )
}