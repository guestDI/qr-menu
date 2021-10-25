/* eslint-disable @typescript-eslint/no-empty-function */
import Image from "next/image"
import React, { useCallback, useMemo } from "react"
import { Button, TextWrapper } from ".."
import { useDataLayerContext } from "../../context/DataLayerContext"
import { getCurrencySign } from "../../helpers/helpers"
import { Add } from "../../inline-img/svg"
import classes from "./styles.module.css"

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

	const itemCount = grouppedCardItems[uid]?.count

	return (
		<div className={classes.card} onClick={onCardClick}>
			<div>
				<Image
					alt="Dishes"
					src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
					width={400}
					height={400}
					loading="eager" //check this property in future
					className={classes.cardImage}
					quality={50}
				/>
				<div className={classes.cardContent}>
					<TextWrapper className={classes.cardContent__title} numberOfRows={1}>
						{name}
					</TextWrapper>
					<TextWrapper className={classes.cardContent__desc}>
						{shortDescription || (
							<span style={{ fontStyle: "italic" }}>
								No description available
							</span>
						)}
					</TextWrapper>
				</div>
			</div>

			<div className={classes.cardFooter}>
				<p className={classes.cardFooter__price}>
					{price} {price && currencySign}
				</p>
				<div>
					<Button
						content={itemCount ?? <Add height={14} />}
						round={true}
						onClick={onAddToBasket}
						type={itemCount ? "primary" : "default"}
						className={classes.btn}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card
