"use client";

import axiosInstance from "@/api/axios";
import { useDataLayerContext } from "@/context/DataLayerContext";
import { GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Menu.module.scss";
import {
	Button,
	Card,
	CategoriesPanel,
	DetailsView,
	ShoppingCart,
} from "../components";

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
			key={`${category}-${id}`}
			name={title}
			price={price}
			image={image}
			onCardClick={() => onCardClick(category, id)}
			description={description}
			addToBasket={() => addToBasket({ category, id })}
		/>
	);
};

interface MenuProps {
	menuData: any[];
}

const Menu: NextPage<MenuProps> = ({ menuData }) => {
	console.log("menuData", menuData);
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
		// Implementation for moving to category
	}, []);

	const menuCards = useMemo(
		() =>
			menuData.map((menuItem: any, i: number) => {
				return (
					<section
						id={menuItem.category}
						className={styles.categoryContainer}
						key={i}
					>
						<h1 className={styles.categoryTitle}>{menuItem.category}</h1>
						<div className={styles.cardsContainer}>
							{menuItem.items.map((item: any) =>
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
			<CategoriesPanel categories={categories} onClick={moveToCategory} />
			{Object.keys(grouppedCardItems).length > 0 && (
				<Button
					onClick={() => toggleModal()}
					className={styles.shoppingCartBtn}
					type="button"
				>
					<ButtonContent total={total} />
				</Button>
			)}
			{menuCards}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const response = await axiosInstance.get(
			"/menu/public/66d4c257ada272575bccd7d8"
		);
		const menuData = response.data;

		return {
			props: {
				menuData,
			},
			revalidate: 60, // Revalidate every 60 seconds
		};
	} catch (error) {
		console.error("Failed to fetch menu data:", error);
		return {
			props: {
				menuData: [],
			},
		};
	}
};

export default Menu;
