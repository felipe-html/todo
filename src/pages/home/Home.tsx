import { useEffect } from "react";
import { Form } from "../../components/Form/Form";
import { Header } from "../../components/Header/Header";
import { Task } from "../../components/Task/Task";
import { localstorage_tasks_key } from "../../constants";
import { useTask } from "../../hooks/useTasks";
import { TaskProps } from "../../types/Task";
import utils from "../../utils/utils";
import styles from "./Home.module.scss";

export function Home() {
    const {allTasks, setAllTasks, allTasksDone, countTasksDone} = useTask()

    function onLoadScreen() {
        let tasks = utils.recoveryFromLocalStorage(localstorage_tasks_key) as TaskProps[]

        setAllTasks(tasks ? tasks : [])
        countTasksDone()
    }

    useEffect(() => {onLoadScreen()},[])

    return(
        <main>
            <Header/>
            <Form />

            <div className={styles.container}>
                <div className={styles.tasksStatus}>
                    <p className={styles.createdTasks}>Tarefas criadas <span>{allTasks.length}</span></p>
                    <p className={styles.finishedTasks}>Concluídas <span>{allTasksDone} de {allTasks.length}</span></p>
                </div>
                <section className={styles.tasksContainer}>
                    {allTasks.length !== 0 ? (
                        allTasks.map((task, key) => (
                            <Task
                                key={key}
                                id={task.id}
                                description={task.description}
                                isDone={task.isDone}
                            />
                        ))
                    ) : ( 
                    <div className={styles.emptyTasks}> 
                        <img src="/Clipboard.svg" alt="" />
                        <strong> Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus items a fazer</p>
                    </div>
                    )
                    }
                </section>
            </div>
        </main>
    )
}