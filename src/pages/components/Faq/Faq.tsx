/* eslint react/prop-types: 0 */
import clsx from "clsx";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import styles from "./styles.module.scss";

interface FaqProps {
	data: { rows: Array<{ title: string; content: string }> };
	className?: string;
}

const FaqComponent: React.FC<FaqProps> = ({ data, className }) => {
	return (
		<div className={clsx(styles.faq, className)}>
			<Accordion
				className={styles.accordion}
				allowMultipleExpanded
				allowZeroExpanded
			>
				{data.rows.map((row, index) => {
					return (
						<AccordionItem key={index} className={styles.accordion__item}>
							<AccordionItemHeading>
								<AccordionItemButton className={styles.accordion__button}>
									{row.title}
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className={styles.accordion__panel}>
								<p>{row.content}</p>
							</AccordionItemPanel>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default FaqComponent;
