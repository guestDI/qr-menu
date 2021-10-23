import React from "react"
import { TextWrapper } from ".."
import { useDataLayerContext } from "../../context/DataLayerContext"
import { getCurrencySign } from "../../helpers/helpers"
import { ShoppingCartItem } from "../../model/types"
import Button from "../Button/Button"
import InputCounter from "../InputCounter/InputCounter"
import styles from "./styles.module.css"

const renderOrderRow = (item: ShoppingCartItem, addItemToShoppingCart: any) => {
	const { count, priceCurrency, price, name, uid, category } = item

	return (
		<div key={uid} className={styles.row}>
			<div className={styles.itemDetails}>
				<TextWrapper className={styles.title} numberOfRows={1}>
					{name}
				</TextWrapper>
				<span>
					{price} {getCurrencySign(priceCurrency)}
				</span>
			</div>
			<div className={styles.inputContainer}>
				<InputCounter
					value={count}
					increaseCount={() => addItemToShoppingCart(category, uid)}
					decreaseCount={() => {}}
				/>
				<span>
					{price * count} {getCurrencySign(priceCurrency)}
				</span>
			</div>
		</div>
	)
}

const ShoppingCart = () => {
	const { grouppedCardItems, addItemToShoppingCart, total } =
		useDataLayerContext()

	return (
		<div>
			<div className={styles.header}>Your cart</div>
			<div className={styles.content}>
				{Object.values(grouppedCardItems).map((item) =>
					renderOrderRow(item, addItemToShoppingCart)
				)}
			</div>

			<div className={styles.footer}>
				<div className={styles.footerTotalLabel}>Total</div>
				<div className={styles.footerTotalPrice}>{total}</div>
			</div>
			<div className={styles.footerBtnContainer}>
				<Button content="Clear" onClick={() => {}}></Button>
				<Button type="primary" content="Order" onClick={() => {}}></Button>
			</div>
		</div>
	)
}

export default ShoppingCart
