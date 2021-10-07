import React, { useMemo } from "react"
import { Card } from "../components"
import styles from "../../styles/Menu.module.css"

const arr = ["Soup", "Meat", "Chicken", "Something else", "New"]

const Menu: React.FC = () => {
    const menuCards = useMemo(() => {
        return arr.map((item, index) => <Card key={index} name={item} price="5.50" shortDescription="Shorttt sd fs fsd fsd fs fs fs fs df dfs sdfsdfsdf"/>)
    }, [arr])

    return (
        <>
            <h1>Menu</h1>
            <div className={styles.container}>
                {menuCards}
            </div>
        </>
    )
}

export default Menu