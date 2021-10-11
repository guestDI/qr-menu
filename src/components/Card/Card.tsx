import Image from 'next/image'

import React from "react"
import Button from "../Button/Button"
import styles from "./styles.module.css"
import ShoppingCart from "../../inline-img/svg/shoppingbasket.svg"

interface CardProps {
    name: string
    price: string
    shortDescription: string
}

const Card: React.FC<CardProps> = ({name, price, shortDescription}) => {
    return (
        <div className={styles.card}>
            <div>
            <Image
                alt="Dishes"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80"
                width={1200}
                height={1200}
                loading="eager" //check this property in future
                className={styles.cardImage}
                quality={50}
            />
                <div className={styles.cardContent}>
                    <p className={styles.cardContent__title}>{name}</p>
                    <p className={styles.cardContent__desc}>
                        {shortDescription}
                    </p>
                </div>                
            </div>
            
            <div className={styles.menuCard__footer}>
                <p className={styles.price}>{price}</p>
                <div className={styles.btnContainer}>
                    <Button content={<ShoppingCart height={24}/>} onClick={() => {}}/>
                </div>
            </div>
        </div>
    )
}

export default Card