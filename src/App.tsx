import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { PlusCircle } from "phosphor-react";

import logoToDo from "./assets/logo_ignite_todo.svg";
import clipboard from "./assets/clipboard.svg";

import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.css";
import "./global.css";

import { Task } from "./components/Task";

export interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [titleTask, setTitleTask] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event?.preventDefault();

    const newTask = {
      id: uuidv4(),
      title: titleTask,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setTitleTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTitleTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function completeTask(taskId: string) {
    const newTasks = [...tasks];
    const itemTask = newTasks.find((item) => item.id == taskId);

    if (itemTask) itemTask.isComplete = !itemTask.isComplete;

    setTasks(newTasks);
    console.log(newTasks);
  }

  function getLabelTasksFinished(): string {
    let label = "0";

    const tasksCompleted = tasks.filter((item) => item.isComplete);
    if (tasksCompleted.length > 0)
      label = `${tasksCompleted.length} de ${tasks.length}`;

    return label;
  }

  const isTaskEmpty = tasks.length === 0;
  const numberCreatedTasks = tasks.length;
  const numberCompletedTasks = getLabelTasksFinished();

  return (
    <div className={styles.container}>
      <header>
        <img src={logoToDo} alt="To Do List" />

        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            name="task-name"
            id="task-name"
            placeholder="Adicione uma nova tarefa"
            value={titleTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />

          <button type="submit">
            Criar <PlusCircle size={16} />
          </button>
        </form>
      </header>

      <main>
        <div className={styles.aboutTasks}>
          <div className={styles.createdTasks}>
            <h2>Tarefas criadas</h2>
            <span>{numberCreatedTasks}</span>
          </div>

          <div className={styles.completedTasks}>
            <h2>Concluídas</h2>
            <span>{numberCompletedTasks}</span>
          </div>
        </div>

        {isTaskEmpty ? (
          <div className={styles.withoutTasks}>
            <img src={clipboard} />
            <h3>Você ainda não tem tarefas cadastradas</h3>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isComplete={task.isComplete}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
