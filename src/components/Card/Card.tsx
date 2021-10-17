import Image from "next/image"

import React, { useCallback, useMemo } from "react"
import Button from "../Button/Button"
import styles from "./styles.module.css"
import { Add } from "../../inline-img/svg"
import clsx from "clsx"
import { getCurrencySign } from "../../helpers/helpers"

interface CardProps {
  name: string
  price: string
  priceCurrency?: string
  shortDescription: string
  onCardClick: () => void
  addToBasket: () => void
}

const Card: React.FC<CardProps> = ({
  name,
  price,
  priceCurrency,
  shortDescription,
  onCardClick,
  addToBasket,
}) => {
  const onAddToBasket = useCallback(
    (e) => {
      e.stopPropagation()

      addToBasket()
    },
    [addToBasket],
  )

  const currencySign = useMemo(
    () => getCurrencySign(priceCurrency || ""),
    [priceCurrency],
  )

  return (
    <div className={styles.card} onClick={onCardClick}>
      <div>
        <Image
          alt="Dishes"
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
          width={400}
          height={400}
          loading="eager" //check this property in future
          className={styles.cardImage}
          quality={50}
        />
        <div className={styles.cardContent}>
          <p className={clsx([styles.cardContent__title, styles.lineClamp])}>
            {name}
          </p>
          <p className={clsx([styles.cardContent__desc, styles.lineClamp])}>
            {shortDescription}
          </p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <p className={styles.cardFooter__price}>
          {price} {currencySign}
        </p>
        <div className={styles.btnContainer}>
          <Button
            content={<Add width={22} height={22} />}
            onClick={onAddToBasket}
            round={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
