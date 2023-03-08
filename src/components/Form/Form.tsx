import { useState } from "react";
import {IoIosAddCircleOutline} from "react-icons/io"
import { localstorage_tasks_key } from "../../constants";
import { useTask } from "../../hooks/useTasks";
import { TaskProps } from "../../types/Task";
import utils from "../../utils/utils"
import styles from "./Form.module.scss";

export function Form() {
    const {allTasks, setAllTasks} = useTask()

    const [taskDescription, setTaskDescription] = useState<string>("")

    function handleCreateNewTask() {
        if(!taskDescription || taskDescription.replace(/ /g, "") === "") { 
            setTaskDescription("")
            return
        }

        let tasks = [] as TaskProps[]

        let tasksFromStorage = utils.recoveryFromLocalStorage(localstorage_tasks_key) as TaskProps[]

        if(tasksFromStorage){
            tasks = [...tasksFromStorage]
        }

        tasks.push({
            description: taskDescription,
            id: allTasks.length === 0 ? 1 : allTasks[allTasks.length - 1].id + 1,
            isDone: false
        })

        setAllTasks(tasks)
        utils.saveIntoLocalStorage(localstorage_tasks_key, tasks)
        setTaskDescription("")
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <label htmlFor=""></label>
                    <input 
                        onChange={(event) => setTaskDescription(event.currentTarget.value)} 
                        value={taskDescription} 
                        type="text" 
                        placeholder={"Adicione uma nova tarefa"}
                        onKeyUp={(event) => {
                            if(event.key === "Enter") handleCreateNewTask()
                        }}
                    />
                </div>
                <button 
                    className={styles.button} 
                    type="button" 
                    onClick={handleCreateNewTask}
                >
                    <p>Criar</p> 
                    <IoIosAddCircleOutline/>
                </button>
            </div>
        </section>
    )
}