import React from "react"
import { Card } from "../components"
import styles from "../../styles/Menu.module.css"

const Menu: React.FC = () => {
    return (
        <>
            <h1>Menu</h1>
            <div className={styles.container}>
                <Card title="Soup" price="3.00"/>
                <Card title="Meat" price="5.50"/>
                <Card title="Chicken"price="10.00"/>
            </div>
        </>
    )
}

export default Menu