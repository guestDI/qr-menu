import clsx from "clsx";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { Close } from "../../inline-img/svg";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
	closeOnBackdrop?: boolean;
	className?: string;
	placement: "center" | "bottom";
}

const ModalOverlay: React.FC<ModalProps> = ({
	show,
	onClose,
	className,
	children,
	closeOnBackdrop = "true",
	placement,
}) => {
	const handleClose = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.stopPropagation();
			onClose();
		},
		[onClose]
	);

	const displayStyle = useMemo(
		() => (show ? styles.displayBlock : styles.displayNone),
		[show]
	);

	return (
		<>
			<div
				onClick={closeOnBackdrop ? handleClose : () => {}}
				className={clsx(styles.modalBackdrop, displayStyle)}
			>
				{closeOnBackdrop && (
					<Button
						className={styles.btnClose}
						round={true}
						onClick={handleClose}
					>
						<Image src={Close} alt="Close Modal" width={20} height={20} />{" "}
					</Button>
				)}
			</div>
			<section
				className={clsx(
					styles.modalMain,
					displayStyle,
					styles[placement],
					className
				)}
			>
				{children}
			</section>
		</>
	);
};

const Modal: React.FC<ModalProps> = ({
	show,
	onClose,
	className,
	children,
	placement = "center",
	closeOnBackdrop = false,
}) => {
	// hack to prevent scrolling when modal is open
	// useEffect(() => {
	// 	const overflowState = show ? "hidden" : "unset";
	// 	document.body.style.overflow = overflowState;
	// }, [show]);

	return (
		<ModalOverlay
			placement={placement}
			onClose={onClose}
			show={show}
			className={className}
			closeOnBackdrop={closeOnBackdrop}
		>
			{children}
		</ModalOverlay>
	);
};

export default Modal;
