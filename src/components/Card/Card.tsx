/* eslint-disable @typescript-eslint/no-empty-function */
import TextWrapper from "@/components/TextWrapper/TextWrapper";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { useDataLayerContext } from "../../context/DataLayerContext";
import { getCurrencySign } from "../../helpers/helpers";
import addIcon from "../../inline-img/svg/add.svg";
import Button from "../Button/Button";
import { default as classes, default as styles } from "./styles.module.scss";

interface CardProps {
	uid: string;
	name: string;
	price: string;
	priceCurrency?: string;
	description: string;
	image: string;
	onCardClick: () => void;
	addToBasket: () => void;
}

const Card: React.FC<CardProps> = ({
	uid,
	name,
	price,
	priceCurrency,
	description,
	image,
	onCardClick,
	addToBasket,
}) => {
	const { grouppedCardItems } = useDataLayerContext();
	const onAddToBasket = useCallback(
		(e: Event) => {
			e.stopPropagation();
			addToBasket();
		},
		[addToBasket]
	);

	const currencySign = useMemo(
		() => getCurrencySign(priceCurrency || ""),
		[priceCurrency]
	);

	const itemCount = grouppedCardItems[uid]?.count;

	return (
		<div className={classes.card} onClick={onCardClick}>
			<div>
				{image ? (
					<Image
						alt="Dishes"
						src={image}
						width={180}
						height={180}
						loading="eager" //check this property in future
						className={classes.cardImage}
						quality={50}
					/>
				) : (
					<div className={styles.placeholder}>No image</div>
				)}
				<div className={classes.cardContent}>
					<TextWrapper className={classes.cardContent__title} numberOfRows={1}>
						{name}
					</TextWrapper>
					<TextWrapper className={classes.cardContent__desc}>
						{description || (
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
						round={true}
						onClick={onAddToBasket}
						type={itemCount ? "primary" : "default"}
						className={classes.btn}
					>
						{itemCount ?? (
							<Image priority src={addIcon} alt="Add" height={16} />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Card;
