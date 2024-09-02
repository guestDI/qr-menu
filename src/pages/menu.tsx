"use client";

import { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Menu.module.scss";
import {
	Button,
	Card,
	CategoriesPanel,
	DetailsView,
	ShoppingCart,
} from "../components";
import { useDataLayerContext } from "@/context/DataLayerContext";

const ButtonContent: React.FC<{ total: number }> = ({ total }) => (
	<div className={styles.shoppingCartBtnContent}>
		<span>Make order</span>
		<span>{total}</span>
	</div>
);

const renderCards = (
	category: string,
	item: any,
	onCardClick: (category: string, id: string) => void,
	addToBasket: (value: any) => void
) => {
	const { id, title, price, image, description = "" } = item;

	return (
		<Card
			uid={id}
			key={id}
			name={title}
			price={price}
			image={image}
			// priceCurrency={priceCurrency}
			onCardClick={() => onCardClick(category, id)}
			description={description}
			addToBasket={() => addToBasket({ category, id })}
		/>
	);
};

const Menu: NextPage = ({ menuData }) => {
	const [showModal, setShowModal] = useState(false);

	const {
		items,
		addItemToShoppingCart,
		grouppedCardItems,
		shoppingCart,
		clearShoppingCart,
		removeItemFromShoppingCart,
		decreaseItemCount,
		total,
	} = useDataLayerContext();
	const [selectedMenuItem, setSelectedMenuItem] = useState<
		Record<string, string>
	>({});

	const categories = useMemo(
		() => menuData.map((menuItem: any) => menuItem.category),
		[menuData]
	);

	const itemIsSelected = !!Object.keys(selectedMenuItem).length;

	useEffect(() => {
		if (!shoppingCart.length && !itemIsSelected) {
			setShowModal(false);
		}
	}, [shoppingCart, itemIsSelected]);

	const toggleModal = useCallback(
		(category?: string, itemId?: string) => {
			setShowModal((prevState) => !prevState);
			if (category && itemId) {
				setSelectedMenuItem({ category, itemId });
			} else {
				setSelectedMenuItem({});
			}
		},
		[showModal]
	);

	const clearCart = useCallback(() => {
		clearShoppingCart();
		setShowModal(false);
	}, [clearShoppingCart]);

	const removeFromShoppingCart = useCallback(
		(uid: string) => {
			removeItemFromShoppingCart(uid);
		},
		[removeItemFromShoppingCart]
	);

	const decreaseCount = useCallback(
		(uid: string) => {
			decreaseItemCount(uid);
		},
		[decreaseItemCount]
	);

	const moveToCategory = useCallback((category: string) => {
		// const currentRef: any = sectionRefs[categories.indexOf(category)]
		// const offset = currentRef?.current?.offsetTop ?? 0
		// window.scrollTo({
		// 	top: offset - 80,
		// 	behavior: "smooth",
		// })
	}, []);

	const menuCards = useMemo(
		() =>
			menuData.map((menuItem: any, i: number) => {
				return (
					<section
						id={menuItem.category}
						// ref={sectionRefs[i]}
						// ref={setRef(menuItem.category) as LegacyRef<HTMLElement>}
						className={styles.categoryContainer}
						key={i}
					>
						<h1 className={styles.categoryTitle}>{menuItem.category}</h1>
						<div className={styles.cardsContainer}>
							{menuData.map((item: any) =>
								renderCards(
									menuItem.category,
									item,
									toggleModal,
									addItemToShoppingCart
								)
							)}
						</div>
					</section>
				);
			}),
		[items]
	);

	const placement = itemIsSelected ? "center" : "bottom";
	const modalContent = itemIsSelected ? (
		<DetailsView selectedItem={selectedMenuItem} />
	) : (
		<ShoppingCart
			clearShoppingCart={clearCart}
			removeItemFromShoppingCart={removeFromShoppingCart}
			decreaseItemCount={decreaseCount}
		/>
	);

	return (
		<div className={styles.container}>
			{/*<Head>*/}
			{/*	<link rel="preconnect" href="https://fonts.googleapis.com" />*/}
			{/*	<link*/}
			{/*		rel="preconnect"*/}
			{/*		href="https://fonts.gstatic.com"*/}
			{/*		crossOrigin="anonymous"*/}
			{/*	/>*/}
			{/*	<link*/}
			{/*		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;1,100&display=swap"*/}
			{/*		rel="stylesheet"*/}
			{/*	/>*/}
			{/*</Head>*/}
			<CategoriesPanel categories={categories} onClick={moveToCategory} />
			{Object.keys(grouppedCardItems).length > 0 && (
				<Button
					onClick={toggleModal}
					className={styles.shoppingCartBtn}
					type="primary"
				>
					<ButtonContent total={total} />
				</Button>
			)}
			{menuCards}
			{/*<Modal*/}
			{/*	onClose={toggleModal}*/}
			{/*	show={showModal}*/}
			{/*	className={clsx(*/}
			{/*		placement === "center" ? styles.modalCenter : styles.modalBottom*/}
			{/*	)}*/}
			{/*	placement={placement}*/}
			{/*>*/}
			{/*	{modalContent}*/}
			{/*</Modal>*/}
		</div>
	);
};

export default Menu;
