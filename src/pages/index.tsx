import clsx from "clsx";
import type { GetStaticProps, NextPage } from "next";
import styles from "../../styles/index.module.scss";
import {
	Faq,
	FeaturesGrid,
	Goals,
	Hero,
	NavigationBar,
	SectionLayout,
} from "./components";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer/Footer";
import { IFaqData, IEntityData } from "../model/types";

type HomeProps = {
	goals: IEntityData[];
	features: IEntityData[];
	questions: IFaqData;
};

const Home: NextPage<HomeProps> = ({ goals, features, questions }) => {
	const router = useRouter();

	const onClick = () => {
		router.push("/registration");
	};

	return (
		<div className={styles.container}>
			<nav className={styles.mainNav}>
				<NavigationBar onClick={onClick} />
			</nav>
			<main className={styles.main}>
				<Hero
					id="intro"
					className={clsx(styles.section, styles.intro)}
					onClick={onClick}
				/>
				<SectionLayout
					id="goals"
					separator={false}
					title="Our Goals"
					subTitle="Increase productivity with a simple app for managing menu."
					className={styles.goals}
				>
					<Goals data={goals} />
				</SectionLayout>
				{/* Features section */}
				<SectionLayout
					id="features"
					title="Why you should choose our app"
					subTitle="The rise of mobile devices transforms the way we consume information entirely."
					separator={false}
				>
					<FeaturesGrid data={features} />
				</SectionLayout>
				<SectionLayout
					id="faq"
					title="Frequently asked questions"
					subTitle="The rise of mobile devices transforms the way we consume information entirely and we need to know how to use it."
					separator={false}
					className={styles.faq}
					bottomMargin={false}
				>
					<Faq data={questions} />
				</SectionLayout>
			</main>

			<Footer />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const goals = (await import("../../data/goals.json")).default;
	const features = (await import("../../data/features.json")).default;
	const questions = (await import("../../data/faq.json")).default;

	return {
		props: {
			goals,
			features,
			questions,
		},
	};
};

export default Home;
