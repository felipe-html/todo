import { useState } from "react";
import {HiOutlineTrash} from "react-icons/hi"
import { TaskProps } from "../../types/Task";
import styles from "./Task.module.scss";

export interface TaskComponentProps extends TaskProps {
    onDelete: () => void,
    onCheck: (value: boolean) => void
}

export function Task({description, isDone, onCheck, onDelete}: TaskComponentProps) {

    return (
        <article className={`${styles.article} ${isDone && styles.done}`}>
            <div className={styles.container}>
                <div className={styles.checkboxContainer}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" checked={isDone} onChange={(event) => onCheck(event.target.checked)} />
                        <span className={styles.checkmark} title={isDone ? "Marcar como não realizada." : "Marcar como realizada."}/>
                    </label>
                </div>
                <p>{description}</p>
            </div>
            <span className={styles.icon} title={"Excluir tarefa"} onClick={onDelete}>
                <HiOutlineTrash />
            </span>
        </article>
    )
}