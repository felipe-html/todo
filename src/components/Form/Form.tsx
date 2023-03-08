import {IoIosAddCircleOutline} from "react-icons/io"
import styles from "./Form.module.scss";

interface FormProps {
    onCreate: () => void
    onChange: (value: string) => void
    value: string
}

export function Form({onCreate, onChange, value}: FormProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <label htmlFor=""></label>
                    <input 
                        onChange={(event) => onChange(event.currentTarget.value)} 
                        value={value} 
                        type="text" 
                        placeholder={"Adicione uma nova tarefa"}
                        onKeyUp={(event) => {
                            if(event.key === "Enter") onCreate()
                        }}
                    />
                </div>
                <button 
                    className={styles.button} 
                    type="button" 
                    onClick={onCreate}
                >
                    <p>Criar</p> 
                    <IoIosAddCircleOutline/>
                </button>
            </div>
        </section>
    )
}