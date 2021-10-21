import React from "react"
import { useDataLayerContext } from "../../context/DataLayerContext"
import Button from "../Button/Button"
import InputCounter from "../InputCounter/InputCounter"
import styles from "./styles.module.css"

const renderOrderRow = (item: any) => {
	return (
		<div className={styles.row}>
			<div className={styles.itemDetails}>
				<span>Title</span>
				<span>5$</span>
			</div>
			<div className={styles.inputContainer}>
				<InputCounter
					value={1}
					increaseCount={() => {}}
					decreaseCount={() => {}}
				/>
				<span>50$</span>
			</div>
		</div>
	)
}

const ShoppingCart = () => {
	const { shoppingCart } = useDataLayerContext()

	console.log(shoppingCart)

	return (
		<div>
			<div className={styles.header}>Your cart</div>
			<div className={styles.content}>
				{shoppingCart.map((item) => renderOrderRow(item))}
			</div>

			<div className={styles.footer}>
				<div className={styles.footerTotalLabel}>Total</div>
				<div className={styles.footerTotalPrice}>34</div>
			</div>
			<div className={styles.footerBtnContainer}>
				<Button content="Clear" onClick={() => {}}></Button>
			</div>
		</div>
	)
}

export default ShoppingCart
