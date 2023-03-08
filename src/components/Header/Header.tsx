import { Form } from "../Form/Form"
import styles from "./Header.module.scss"

export function Header() {
    return (
        <header className={styles.header}>
            <section className={styles.section}>
                <img src="/Logo.svg" alt="todo"/>
            </section>
            {/* <Form/> */}
        </header>
    )
}