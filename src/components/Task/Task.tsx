import {HiOutlineTrash} from "react-icons/hi"
import { localstorage_tasks_key } from "../../constants";
import { useTask } from "../../hooks/useTasks";
import { TaskProps } from "../../types/Task";
import utils from "../../utils/utils";
import styles from "./Task.module.scss";

export interface TaskComponentProps extends TaskProps {}

export function Task({description, isDone, id}: TaskComponentProps) {
    const {setAllTasks, countTasksDone} = useTask()

    function handleDeleteTask() {
        let tasks = utils.recoveryFromLocalStorage(localstorage_tasks_key) as TaskProps[]

        if(!tasks) return
        let tasksFiltered = tasks.filter(task => task.id !== id)
        
        utils.saveIntoLocalStorage(localstorage_tasks_key, tasksFiltered)
        setAllTasks(tasksFiltered)
        countTasksDone()
    }

    function handleChangeTaskStatus(status: boolean) {
        let tasks = utils.recoveryFromLocalStorage(localstorage_tasks_key) as TaskProps[]

        if(!tasks) return

        tasks.forEach(task => {
            if(task.id === id) task.isDone = status
        })
        
        utils.saveIntoLocalStorage(localstorage_tasks_key, tasks)
        setAllTasks(tasks)
        countTasksDone()
    }

    return (
        <article className={`${styles.article} ${isDone && styles.done}`}>
            <div className={styles.container}>
                <div className={styles.checkboxContainer}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" checked={isDone} onChange={(event) => handleChangeTaskStatus(event.target.checked)} />
                        <span className={styles.checkmark}/>
                    </label>
                </div>
                <p>{description}</p>
            </div>
            <span className={styles.icon} title={"Excluir tarefa"} onClick={handleDeleteTask}>
                <HiOutlineTrash />
            </span>
        </article>
    )
}