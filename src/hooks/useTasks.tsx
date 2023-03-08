import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { localstorage_tasks_key } from "../constants";
import { TaskProps } from "../types/Task";
import utils from "../utils/utils";

interface useTaskProps {
  children: ReactNode;
}

interface TaskContextData {
    allTasks: TaskProps[],
    setAllTasks: Dispatch<SetStateAction<TaskProps[]>>,
    allTasksDone: number,
    setAllTasksDone: Dispatch<SetStateAction<number>>,
    countTasksDone: () => void,
}

export const TaskContext = createContext({} as TaskContextData);

function TaskProvider({ children }: useTaskProps) {
    const [allTasks, setAllTasks] = useState<TaskProps[]>([])
    const [allTasksDone, setAllTasksDone] = useState<number>(0)

    function countTasksDone() {
      let countTasksDone = 0

      let tasks = utils.recoveryFromLocalStorage(localstorage_tasks_key) as TaskProps[];

      if(tasks) {
        tasks.forEach(task => {
          task.isDone && countTasksDone ++
        })
      }

      setAllTasksDone(countTasksDone)
    }

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        setAllTasks,
        allTasksDone,
        setAllTasksDone,
        countTasksDone
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  return useContext(TaskContext);
}

export { useTask, TaskProvider };
