import Image from 'next/image'

import React from "react"
import Button from "../Button/Button"
import styles from "./styles.module.css"

interface CardProps {
    title: string
}

const Card: React.FC<CardProps> = ({title}) => {
    return (
        <div className={styles.card}>
            <Image
                alt="Dishes"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80"
                width={1302}
                height={868}
                layout="responsive"
            />
            <div className={styles.content}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p>Text with some information</p>
                <p>Price</p>
                <Button title="Add to order"/>
            </div>
        </div>
    )
}

export default Card