import axiosInstance from "@/api/axios";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import CloseIcon from "@/inline-img/svg/close.svg";
import { IMenuItem } from "@/model/types";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImagePicker from "./ImagePicker/ImagePicker";
import styles from "./styles.module.scss";

interface ICategories {
	label: string;
	value: string;
}

export interface CreatorFormProps {
	onSubmit: (data: IMenuItem) => void;
	categories: ICategories[];
	onClose: () => void;
	isMobile: boolean;
	organizationId: string;
}

interface FormData {
	category: string;
	title: string;
	description: string;
	price: number;
}

const CreatorForm: React.FC<CreatorFormProps> = ({
	onSubmit,
	categories,
	onClose,
	isMobile,
	organizationId,
}) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const add = (data: FormData) => {
		onSubmit(data);
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			setMessage("Please select a file.");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await axiosInstance.post(
				"/menu/upload-csv/" + organizationId,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessage(response.data);
		} catch (error) {
			console.error("Error uploading file:", error);
			setMessage("Error uploading file.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<div className={styles.header}>
				<h2>Add new item</h2>
				{isMobile && (
					<Button round={true} onClick={onClose}>
						<Image src={CloseIcon} alt="close" width={15} height={15} />
					</Button>
				)}
			</div>
			<form onSubmit={handleSubmit(add)}>
				<Select
					options={categories}
					size="lg"
					placeholder="Select Category"
					onAdd={() => {
						console.log("Add new option clicked");
					}}
					{...register("category")}
				/>
				<Input
					size="lg"
					placeholder="Title"
					type="text"
					error={errors?.title?.message as string}
					{...register("title")}
				/>
				<Textarea placeholder="Description" {...register("description")} />
				<Input
					size="lg"
					placeholder="Price"
					type="number"
					error={errors?.price?.message as string}
					{...register("price")}
				/>
				<ImagePicker onImageSelect={(file) => console.log(file)} />
				<Button
					size="sm"
					className={clsx(styles.btn, styles.addBtn)}
					type="submit"
				>
					Save
				</Button>
			</form>
			<p style={{ color: "#fff" }}>OR</p>
			<p style={{ color: "#fff" }}>UPLOAD CSV</p>
			<div className={styles.uploadButtonsContainer}>
				<input
					type="file"
					accept=".csv"
					onChange={handleFileChange}
					className={styles.fileInput}
					id="csvUpload"
				/>
				<label htmlFor="csvUpload" className={styles.uploadButton}>
					{selectedFile ? selectedFile.name : "Choose file"}
				</label>
				<Button
					size="sm"
					className={clsx(styles.btn, styles.addBtn)}
					onClick={handleUpload}
					disabled={uploading}
					type="button"
				>
					{uploading ? "Uploading..." : "Upload"}
				</Button>
				{message && <p>{message}</p>}
			</div>
		</div>
	);
};

export default CreatorForm;
