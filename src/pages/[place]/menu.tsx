"use client";

import axiosInstance from "@/api/axios";
import { useDataLayerContext } from "@/context/DataLayerContext";
import useScreenResolution from "@/hooks/useScreenResolution";
import useCartStore from "@/stores/cartStore";
import { GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../../styles/Menu.module.scss";
import {
	Button,
	Card,
	CategoriesPanel,
	DetailsView,
	Modal,
} from "../../components";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";

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
	addToCart: (value: any) => void
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
			addToBasket={() => addToCart({ category, id, title, price, image })}
		/>
	);
};

interface MenuProps {
	menuData: any[];
}

const Menu: NextPage<MenuProps> = ({ menuData }) => {
	const [showModal, setShowModal] = useState(false);
	const { isDesktop } = useScreenResolution();

	const {
		addItemToShoppingCart,
		removeItemFromShoppingCart,
		clearShoppingCart,
		decreaseItemCount,
		cart,
	} = useCartStore();

	const { items, total } = useDataLayerContext();
	const [selectedMenuItem, setSelectedMenuItem] = useState<
		Record<string, string>
	>({});

	const categories = useMemo(
		() => menuData.map((menuItem: any) => menuItem.category),
		[menuData]
	);

	const itemIsSelected = !!Object.keys(selectedMenuItem).length;

	useEffect(() => {
		if (!cart.length && !itemIsSelected) {
			setShowModal(false);
		}
	}, [cart, itemIsSelected]);

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
		(id: string) => {
			removeItemFromShoppingCart(id);
		},
		[removeItemFromShoppingCart]
	);

	const decreaseCount = useCallback(
		(id: string) => {
			decreaseItemCount(id);
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

	const placement = itemIsSelected || isDesktop ? "center" : "bottom";
	const modalContent = itemIsSelected ? (
		<DetailsView selectedItem={selectedMenuItem} />
	) : (
		cart.length > 0 && (
			<ShoppingCart
				cart={cart}
				addItemToShoppingCart={addItemToShoppingCart}
				clearShoppingCart={clearCart}
				removeItemFromShoppingCart={removeFromShoppingCart}
				decreaseItemCount={decreaseCount}
			/>
		)
	);

	return (
		<>
			<div className={styles.container}>
				<CategoriesPanel categories={categories} onClick={moveToCategory} />
				{cart.length > 0 && (
					<Button
						onClick={toggleModal}
						className={styles.shoppingCartBtn}
						type="button"
					>
						<ButtonContent total={total} />
					</Button>
				)}
				{menuCards}
			</div>
			<Modal
				placement={placement}
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				{modalContent}
			</Modal>
		</>
	);
};

export async function getStaticPaths() {
	return {
		paths: [], // No paths are pre-rendered at build time
		fallback: "blocking", // Pages will be generated on-demand
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { params } = context;

	if (!params) {
		return {
			notFound: true,
		};
	}

	const organizationId = params.place as string;

	try {
		const response = await axiosInstance.get("/menu/public/" + organizationId);
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
