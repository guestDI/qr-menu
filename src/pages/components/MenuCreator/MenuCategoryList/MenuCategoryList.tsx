import { IMenuItem } from "@/model/types";
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import MenuCard from "../MenuCard/MenuCard";
import styles from "./styles.module.scss";

interface IMenuCategoryListProps {
	menuData: Array<{
		category: string;
		items: Array<IMenuItem>;
	}>;
	editMenuItem: (item: any) => void; // Specify the type of item if known
	handleDeleteItem: (id: string) => void;
}

const MenuCategoryList: React.FC<IMenuCategoryListProps> = ({
	menuData,
	editMenuItem,
	handleDeleteItem,
}) => {
	return (
		<div className={styles.accordionWrapper}>
			<Accordion className={styles.accordion} allowZeroExpanded>
				{menuData.map((menuItem, index) => {
					return (
						<AccordionItem key={index} className={styles.accordion__item}>
							<AccordionItemHeading>
								<AccordionItemButton className={styles.accordion__button}>
									{menuItem.category}
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className={styles.accordion__panel}>
								<div className={styles["cards-container"]}>
									{menuItem.items.map((item) => (
										<MenuCard
											key={item.id}
											menuItem={item}
											onEdit={() => editMenuItem(item)}
											onDelete={() => handleDeleteItem(item?.id || "")}
										/>
									))}
								</div>
							</AccordionItemPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default MenuCategoryList;
