import clsx from "clsx"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { animateScroll as scroll, Element } from "react-scroll"
import styles from "../../styles/Menu.module.css"
import {
	Button,
	Card,
	CategoriesPanel,
	DetailsView,
	Modal,
	ShoppingCart,
} from "../components"
import { useDataLayerContext } from "../context/DataLayerContext"
import { ChevronDoubleUp, ShoppingBag } from "../inline-img/svg"

const renderCards = (
	// count: number,
	category: string,
	item: any,
	onCardClick: (category: string, id: string | number) => void,
	addToBasket: (value: any) => void
) => {
	const { uid, name, price, priceCurrency, shortDescription = "" } = item

	return (
		<Card
			uid={uid}
			key={uid}
			name={name}
			price={price}
			priceCurrency={priceCurrency}
			onCardClick={() => onCardClick(category, uid)}
			shortDescription={shortDescription}
			addToBasket={() => addToBasket({ category, uid })}
		/>
	)
}

const Menu: React.FC = () => {
	const [showBackToTopButton, setShowBackToTopButton] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const { items, addItemToShoppingCart, grouppedCardItems, shoppingCart } =
		useDataLayerContext()
	const [selectedMenuItem, setSelectedMenuItem] = useState<
		Record<string, string | number>
	>({})

	const setButtonState = useCallback(() => {
		if (window.pageYOffset > 350) {
			setShowBackToTopButton(true)
		} else {
			setShowBackToTopButton(false)
		}
	}, [])

	const toggleModal = useCallback(
		(category?: string, itemId?: string | number) => {
			setShowModal((prevState) => !prevState)
			if (category && itemId) {
				setSelectedMenuItem({ category, itemId })
			} else {
				setSelectedMenuItem({})
			}
		},
		[showModal]
	)

	useEffect(() => {
		window.addEventListener("scroll", setButtonState)

		return () => window.removeEventListener("scroll", setButtonState)
	}, [setButtonState])

	const categories = useMemo(
		() => items.map((menuItem: any) => menuItem.category),
		[items]
	)

	const menuCards = useMemo(
		() =>
			items.map((menuItem: any, i: number) => {
				return (
					<Element key={i} id={menuItem.category} name={menuItem.category}>
						<section className={styles.categoryContainer}>
							<h1 className={styles.categoryTitle}>{menuItem.category}</h1>
							<div className={styles.cardsContainer}>
								{menuItem.items.map((item: any) =>
									renderCards(
										// grouppedCardItems[item.uid].count,
										menuItem.category,
										item,
										toggleModal,
										addItemToShoppingCart
									)
								)}
							</div>
						</section>
					</Element>
				)
			}),
		[items]
	)

	const itemIsSelected = !!Object.keys(selectedMenuItem).length
	const placement = itemIsSelected ? "center" : "bottom"
	const modalContent = itemIsSelected ? (
		<DetailsView selectedItem={selectedMenuItem} />
	) : (
		<ShoppingCart />
	)

	return (
		<div className={styles.container}>
			<CategoriesPanel categories={categories} />
			{Object.keys(grouppedCardItems).length > 0 && (
				<div className={styles.shoppingCartBtnContainer}>
					<Button
						content={<ShoppingBag height={24} />}
						onClick={toggleModal}
						round={true}
						size="lg"
						className={styles.shoppingCart}
						type="primary"
					/>
					<span className={styles.badge}>{shoppingCart.length}</span>
				</div>
			)}
			{menuCards}
			{showBackToTopButton && (
				<Button
					content={<ChevronDoubleUp height={24} />}
					onClick={() => scroll.scrollToTop()}
					round={true}
					size="lg"
					className={clsx(
						styles.floatBtn,
						styles.backToTop,
						showBackToTopButton ? styles.displayBlock : styles.displayNone
					)}
				/>
			)}
			<Modal
				onClose={toggleModal}
				show={showModal}
				className={clsx(
					placement === "center" ? styles.modalCenter : styles.modalBottom
				)}
				placement={placement}
			>
				{modalContent}
			</Modal>
		</div>
	)
}

export default Menu
