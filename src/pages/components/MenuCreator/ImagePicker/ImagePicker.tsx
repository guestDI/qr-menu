import React, { useState } from "react";
import styles from "./styles.module.scss";

interface ImagePickerProps {
	onImageSelect: (file: File | null) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelect }) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
			onImageSelect(file);
		} else {
			setSelectedImage(null);
			onImageSelect(null);
		}
	};

	return (
		<div className={styles.imagePickerContainer}>
			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className={styles.fileInput}
				id="imageUpload"
			/>
			<label htmlFor="imageUpload" className={styles.uploadButton}>
				Choose Image
			</label>
			{selectedImage ? (
				<div className={styles.previewContainer}>
					<img
						src={selectedImage}
						alt="Selected"
						className={styles.previewImage}
					/>
				</div>
			) : (
				<div className={styles.placeholder}>No image selected</div>
			)}
		</div>
	);
};

export default ImagePicker;
