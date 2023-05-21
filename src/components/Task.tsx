import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { TaskProps } from "../App";

interface Props extends TaskProps {
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function Task({
  id,
  title,
  isComplete,
  completeTask,
  deleteTask,
}: Props) {
  return (
    <div className={styles.content}>
      <button
        className={isComplete ? styles.checked : styles.check}
        onClick={() => completeTask(id)}
      >
        {isComplete && <Check size={14} />}
      </button>

      <h2 className={isComplete ? styles.titleCompleted : styles.title}>
        {title}
      </h2>

      <button className={styles.deleteTask} onClick={() => deleteTask(id)}>
        <Trash size={14} />
      </button>
    </div>
  );
}
