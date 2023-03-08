import { useEffect, useState } from "react";
import { Form } from "../../components/Form/Form";
import { Header } from "../../components/Header/Header";
import { Task } from "../../components/Task/Task";
import { TaskProps } from "../../types/Task";
import styles from "./Home.module.scss";

export function Home() {
    const [newTaskDescription, setNewTaskDescription] = useState<string>("")
    const [allTasks, setAllTasks] = useState<TaskProps[]>([])
    const [allTasksDone, setAllTasksDone] = useState<number>(0)

    function handleCreateNewTask() {
        if(!newTaskDescription || newTaskDescription.replace(/ /g, "") === "") { 
            setNewTaskDescription("")
            return
        }

        const newTask = {
            description: newTaskDescription,
            isDone: false,
            id: allTasks.length === 0 ? 1 : allTasks[allTasks.length - 1].id + 1,
        } as TaskProps

        setAllTasks(oldValue => {
            return [...oldValue, newTask]
        })

        setNewTaskDescription("")
    }

    function handleDeleteTask(taskId: number) {
        setAllTasks(oldValue => {
            return oldValue.filter(item => item.id !== taskId)
        })
    }

    function handleChangeTaskStatus(taskId: number, status: boolean) {
        setAllTasks(oldValue => {
            return oldValue.map(task => {
                if(task.id === taskId){
                    return {
                        ...task,
                        isDone: status
                    }
                } else {
                    return task
                }
            })
        })
    }

    function countTasksDone() {
        let countTasksDone = 0

        allTasks.forEach(task => {
            task.isDone && countTasksDone ++
        })

        setAllTasksDone(countTasksDone)
    }

    useEffect(() => {countTasksDone()}, [allTasks])

    return(
        <main>
            <Header/>
            <Form
                onCreate={handleCreateNewTask}
                onChange={(value) => setNewTaskDescription(value)}
                value={newTaskDescription}
            />

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
                                onCheck={(value) => handleChangeTaskStatus(task.id, value)}
                                onDelete={() => handleDeleteTask(task.id)}
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