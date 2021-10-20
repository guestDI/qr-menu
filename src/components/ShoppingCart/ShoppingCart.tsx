import React from "react"
import { useDataLayerContext } from "../../context/DataLayerContext"
import Button from "../Button/Button"
import InputCounter from "../InputCounter/InputCounter"
import styles from "./styles.module.css"

const renderOrderRow = (item: any) => {
	return (
		<div>
			<div>
				<span>Title</span>
				<span>5$</span>
			</div>
			<InputCounter
				value={1}
				increaseCount={() => {}}
				decreaseCount={() => {}}
			/>
		</div>
	)
}

const ShoppingCart = () => {
	const { shoppingCart } = useDataLayerContext()

	console.log(shoppingCart)

	return (
		<div>
			{shoppingCart.map((item) => renderOrderRow(item))}
			<div className={styles.footer}>
				<div className={styles.footerTotalLabel}>Total</div>
				<div className={styles.footerTotalPrice}>34</div>
			</div>
			<Button content="Clear" onClick={() => {}}></Button>
		</div>
	)
}

export default ShoppingCart
