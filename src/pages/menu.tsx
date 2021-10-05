import React from "react"
import { Card } from "../components"
import styles from "../../styles/Menu.module.css"

const Menu: React.FC = () => {
    return (
        <>
            <h1>Menu</h1>
            <div className={styles.container}>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    )
}

export default Menu