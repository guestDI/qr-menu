/* eslint react/prop-types: 0 */
import clsx from "clsx"
import Faq from "react-faq-component"
import styles from "./styles.module.scss"

const defaultData = {
	rows: [
		{
			title: "Lorem ipsum dolor sit amet,",
			content: "Lorem ipsum dolor sit amet, consectetur ",
		},
		{
			title: "Nunc maximus, magna at ultricies elementum",
			content:
				"Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
		},
		{
			title: "Curabitur laoreet, mauris vel blandit fringilla",
			content:
				"Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
		},
		{
			title: "What is the package version",
			content: "v1.0.5",
		},
	],
}

interface FaqProps {
	data?: { rows: Array<{ title: string; content: string }> }
	className?: string
}

const FaqComponent: React.FC<FaqProps> = ({
	data = defaultData,
	className,
}) => {
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
	)
}

export default FaqComponent
