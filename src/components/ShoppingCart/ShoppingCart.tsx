import { TextWrapper } from "..";
import { useDataLayerContext } from "../../context/DataLayerContext";
import { getCurrencySign } from "../../helpers/helpers";
import { Close } from "../../inline-img/svg";
import { ShoppingCartItem } from "../../model/types";
import Button from "../Button/Button";
import InputCounter from "../InputCounter/InputCounter";
import classes from "./styles.module.scss";

const renderOrderRow = (
	item: ShoppingCartItem,
	addItemToShoppingCart: any,
	decreaseItemCount: (uid: string) => void,
	removeItemFromShoppingCart: (uid: string) => void
) => {
	const { count, priceCurrency, price, name, uid, category } = item;

	return (
		<div key={uid} className={classes.row}>
			<div className={classes.itemDetails}>
				<TextWrapper className={classes.title} numberOfRows={1}>
					{name}
				</TextWrapper>
				<Button
					onClick={() => removeItemFromShoppingCart(uid)}
					round={true}
					size="sm"
					className={classes.closeBtn}
				>
					<Close height={20} width={20} />
				</Button>
			</div>
			<div className={classes.inputContainer}>
				<InputCounter
					value={count}
					increaseCount={() => addItemToShoppingCart({ category, uid })}
					decreaseCount={() => decreaseItemCount(uid)}
				/>
				<span>
					{price * count} {getCurrencySign(priceCurrency)}
				</span>
			</div>
		</div>
	);
};

const ShoppingCart = ({
	clearShoppingCart,
	removeItemFromShoppingCart,
	decreaseItemCount,
}: {
	clearShoppingCart: () => void;
	removeItemFromShoppingCart: (uid: string) => void;
	decreaseItemCount: (uid: string) => void;
}) => {
	const { grouppedCardItems, addItemToShoppingCart, total } =
		useDataLayerContext();

	return (
		<div>
			<div className={classes.header}>Your cart</div>
			<div className={classes.content}>
				{Object.values(grouppedCardItems).map((item) =>
					renderOrderRow(
						item,
						addItemToShoppingCart,
						decreaseItemCount,
						removeItemFromShoppingCart
					)
				)}
			</div>

			<div className={classes.footer}>
				<div className={classes.footerTotalLabel}>Total</div>
				<div className={classes.footerTotalPrice}>{total}</div>
			</div>
			<div className={classes.footerBtnContainer}>
				<Button onClick={clearShoppingCart}>Clear</Button>
				<Button type="primary" onClick={() => {}}>
					Order
				</Button>
			</div>
		</div>
	);
};

export default ShoppingCart;
