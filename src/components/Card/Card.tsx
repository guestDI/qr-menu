/* eslint-disable @typescript-eslint/no-empty-function */
import Image from "next/image"
import React, { useCallback, useMemo } from "react"
import { Button, TextWrapper } from ".."
import { useDataLayerContext } from "../../context/DataLayerContext"
import { getCurrencySign } from "../../helpers/helpers"
import { Add } from "../../inline-img/svg"
import styles from "./styles.module.css"

interface CardProps {
	uid: string
	name: string
	price: string
	priceCurrency?: string
	shortDescription: string
	onCardClick: () => void
	addToBasket: () => void
}

const Card: React.FC<CardProps> = ({
	uid,
	name,
	price,
	priceCurrency,
	shortDescription,
	onCardClick,
	addToBasket,
}) => {
	const { grouppedCardItems } = useDataLayerContext()
	const onAddToBasket = useCallback(
		(e) => {
			e.stopPropagation()
			addToBasket()
		},
		[addToBasket]
	)

	const currencySign = useMemo(
		() => getCurrencySign(priceCurrency || ""),
		[priceCurrency]
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
					<TextWrapper className={styles.cardContent__title}>
						{name}
					</TextWrapper>
					<TextWrapper className={styles.cardContent__desc}>
						{shortDescription}
					</TextWrapper>
				</div>
			</div>

			<div className={styles.cardFooter}>
				<p className={styles.cardFooter__price}>
					{price} {currencySign}
				</p>
				<div className={styles.btnContainer}>
					<Button
						content={grouppedCardItems[uid]?.count ?? <Add height={14} />}
						round={true}
						onClick={onAddToBasket}
						type={grouppedCardItems[uid]?.count ? "primary" : "default"}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card
