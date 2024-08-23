/* eslint react/prop-types: 0 */
import clsx from "clsx";
import Faq from "react-faq-component";
import styles from "./styles.module.scss";

interface FaqProps {
	data?: { rows: Array<{ title: string; content: string }> };
	className?: string;
}

const FaqComponent: React.FC<FaqProps> = ({ data = [], className }) => {
	return (
		<div className={clsx(styles.faq, className)}>
			<Faq
				data={data}
				styles={{
					// titleTextSize: "8",
					bgColor: "#f5f7fa",
				}}
				config={{
					arrowIcon: "+",
				}}
			/>
		</div>
	);
};

export default FaqComponent;
