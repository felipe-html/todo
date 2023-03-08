import { Form } from "../Form/Form"
import styles from "./Header.module.scss"

export function Header() {
    return (
        <header className={styles.header}>
            <img src="/Logo.svg" alt="todo"/>
        </header>
    )
}