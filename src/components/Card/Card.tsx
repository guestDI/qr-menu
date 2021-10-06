import Image from 'next/image'

import React from "react"
import Button from "../Button/Button"
import styles from "./styles.module.css"

interface CardProps {
    title: string
    price: string
}

const Card: React.FC<CardProps> = ({title, price}) => {
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
                <p className={styles.cardTitle}>{title}</p>
                <p>Text with some information</p>
                <p>{price}</p>
                <div className={styles.btnContainer}>
                    <Button title="Add to order" onClick={() => {}}/>
                </div>
                
            </div>
        </div>
    )
}

export default Card