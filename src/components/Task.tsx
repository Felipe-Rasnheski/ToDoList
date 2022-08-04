import { Check, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

export function Task() {
  const [isChecked, setChecked] = useState(false);

  function handle() {
    setChecked(!isChecked)
  }

  return (
    <div className={styles.task}>
      <label>
        <div className={styles.checkButton}>
          <Check className={isChecked == true ? styles.checked : styles.hidden}/>
        </div>
        <input type="checkbox" checked={isChecked} onChange={handle}/>
      </label>
      <p className={isChecked == true ? styles.textTask : styles.test}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet, nulla sit, veritatis ipsum laborum? Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      <i className={styles.trash}><Trash size={20} /></i>
    </div>
  )
}