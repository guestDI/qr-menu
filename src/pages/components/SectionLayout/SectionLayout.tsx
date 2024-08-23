import clsx from "clsx";
import React from "react";
import styles from "./styles.module.scss";

interface SectionLayoutProps
	extends Partial<Pick<HTMLElement, "className" | "id">> {
	title?: React.ReactNode;
	children: React.ReactNode;
	subTitle?: React.ReactNode;
	separator?: boolean;
	bottomMargin?: boolean;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
	id,
	title,
	subTitle,
	separator = "true",
	className,
	bottomMargin = true,
	children,
}) => {
	return (
		<section
			id={id}
			className={clsx(styles.section, bottomMargin && styles.mb, className)}
		>
			<h1>{title}</h1>
			{subTitle && <p>{subTitle}</p>}
			{children}
			{separator && <hr />}
		</section>
	);
};

export default SectionLayout;
