import Image from 'next/image'

import React from 'react'
import Button from '../Button/Button'
import styles from './styles.module.css'
import {Add} from '../../inline-img/svg'
import clsx from 'clsx'

interface CardProps {
  name: string
  price: string
  shortDescription: string
}

const Card: React.FC<CardProps> = ({
  name,
  price,
  shortDescription,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <Image
          alt="Dishes"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80"
          width={1200}
          height={1000}
          loading="eager" //check this property in future
          className={styles.cardImage}
          quality={50}
        />
        <div className={styles.cardContent}>
          <p className={clsx([styles.cardContent__title, styles.lineClamp])}>{name}</p>
          <p className={clsx([styles.cardContent__desc, styles.lineClamp])}>
            {shortDescription}
          </p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <p className={styles.cardFooter__price}>{price}</p>
        <div className={styles.btnContainer}>
          <Button
            content={<Add width={18} height={18}/>}
            onClick={() => {}}
            round={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
