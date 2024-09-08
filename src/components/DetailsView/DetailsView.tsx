import React, { useCallback, useMemo, useState } from "react";
import { useDataLayerContext } from "../../context/DataLayerContext";
import { getCurrencySign } from "../../helpers/helpers";
import { Add } from "../../inline-img/svg";
import Button from "../Button/Button";
import InputCounter from "../InputCounter/InputCounter";
import classes from "./styles.module.scss";

interface DetailsViewProp {
	selectedItem: Record<string, string>;
}

const DetailsView: React.FC<DetailsViewProp> = ({ selectedItem }) => {
	const { items, addItemToShoppingCart, decreaseItemCount, grouppedCardItems } =
		useDataLayerContext();

	const [category, uid] = Object.values(selectedItem);
	const categoryItems = useMemo(
		() => items.find((item: any) => item.category === category),
		[items, category]
	);

	const [count, setCount] = useState(grouppedCardItems[uid]?.count ?? 0);

	const itemDetails = useMemo(
		() => categoryItems?.items.find((item: any) => item.uid === uid),
		[items, category, uid]
	);

	const increaseCount = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.stopPropagation();
			addItemToShoppingCart({ category, uid });
			setCount((prevState: any) => prevState + 1);
		},
		[count, addItemToShoppingCart]
	);

	const decreaseCount = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.stopPropagation();
			decreaseItemCount(uid);
			setCount((prevState: any) => prevState - 1);
		},
		[count, decreaseItemCount]
	);

	return (
		<div className={classes.detailsContainer}>
			<div
				className={classes.imgContainer}
				style={{ display: "flex", alignSelf: "center", margin: "0 4rem" }}
			>
				{/* <Image
					alt="Dishes"
					src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
					width={300}
					height={300}
					loading="eager" //check this property in future
					quality={50}
					className={classes.img}
				/> */}
			</div>
			<div className={classes.mainContainer}>
				<div className={classes.content}>
					<p className={classes.contentTitle}>{itemDetails?.name}</p>
					<p className={classes.contentDesc}>
						{itemDetails?.shortDescription || (
							<span style={{ fontStyle: "italic" }}>
								No description available
							</span>
						)}
					</p>
				</div>
				<div className={classes.footer}>
					<span className={classes.footerPrice}>
						{itemDetails?.price}{" "}
						{getCurrencySign(itemDetails?.priceCurrency || "")}
					</span>
					{!count ? (
						<Button onClick={increaseCount} className={classes.btn}>
							<span className={classes.btnContent}>
								<Add width={18} height={18} />
								<span>Add</span>
							</span>
						</Button>
					) : (
						<InputCounter
							value={count}
							increaseCount={increaseCount}
							decreaseCount={decreaseCount}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default DetailsView;
