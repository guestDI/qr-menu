import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea/Textarea";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import ImagePicker from "./ImagePicker/ImagePicker";
import styles from "./styles.module.scss";

export interface CreatorFormProps {
	onSubmit: () => void;
}

interface FormData {
	category: string;
	title: string;
	description: string;
	price: string;
}

const CreatorForm: React.FC<CreatorFormProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const add = (data: FormData) => {
		// Handle form submission
		console.log(data);
		onSubmit(); // Call the onSubmit prop
	};

	return (
		<div className={styles.formContainer}>
			<h2>Add / Edit</h2>
			<form onSubmit={handleSubmit(add)}>
				<Select
					options={[
						{ label: "Option 1", value: "1" },
						{ label: "Option 2", value: "2" },
					]}
					size="lg"
					placeholder="Select Category"
					name="category"
					onAdd={() => {
						console.log("Add new option clicked");
					}}
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
					type="text"
					error={errors?.price?.message as string}
					{...register("price")}
				/>
				<ImagePicker onImageSelect={(file) => console.log(file)} />
				<Button className={clsx(styles.btn, styles.addBtn)} type="submit">
					Save
				</Button>
			</form>
		</div>
	);
};

export default CreatorForm;
