import Image from "next/image"
import React, { useCallback, useMemo, useState } from "react"
import { InputCounter } from ".."
import { getCurrencySign } from "../../helpers/helpers"
import classes from "./styles.module.css"
import { useDataLayerContext } from "../../context/DataLayerContext"

interface DetailsViewProp {
	selectedItem: Record<string, string | number>
}

const DetailsView: React.FC<DetailsViewProp> = ({ selectedItem }) => {
	const [count, setCount] = useState(0)
	const { items } = useDataLayerContext()

	const [category, itemId] = Object.values(selectedItem)
	const categoryItems = useMemo(
		() => items.find((item: any) => item.category === category),
		[items, category]
	)

	const itemDetails = useMemo(
		() => categoryItems?.items.find((item: any) => item.uid === itemId),
		[items, category, itemId]
	)

	const increaseCount = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.stopPropagation()
			setCount((prevState) => prevState + 1)
		},
		[count]
	)

	const decreaseCount = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.stopPropagation()
			setCount((prevState) => prevState - 1)
		},
		[count]
	)

	return (
		<div className={classes.detailsContainer}>
			<div
				className={classes.imgContainer}
				style={{ display: "flex", alignSelf: "center" }}
			>
				<Image
					alt="Dishes"
					src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
					width={300}
					height={300}
					loading="eager" //check this property in future
					quality={50}
					className={classes.img}
				/>
			</div>
			<div className={classes.mainContainer}>
				<div className={classes.content}>
					<p className={classes.contentTitle}>{itemDetails?.name}</p>
					<p className={classes.contentDesc}>{itemDetails?.shortDescription}</p>
				</div>
				<div className={classes.footer}>
					<span className={classes.footerPrice}>
						{itemDetails?.price} {getCurrencySign(itemDetails?.priceCurrency || "")}
					</span>
					<InputCounter
						value={count}
						increaseCount={increaseCount}
						decreaseCount={decreaseCount}
					/>
				</div>
			</div>
		</div>
	)
}

export default DetailsView
