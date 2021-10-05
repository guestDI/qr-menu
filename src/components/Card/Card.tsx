import React from "react"
import Button from "../Button/Button"
import styles from "./styles.module.css"

const Card: React.FC = () => {
    return (
        <div className={styles.card}>
            <div >Image</div>
            <p className={styles.cardTitle}>Text</p>
            <p>Text with some information</p>
            <h4>Price</h4>
            <Button title="Add to order"/>
        </div>
    )
}

export default Card