import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import questions from "../../data/faq.json";
import features from "../../data/features.json";
import goals from "../../data/goals.json";
import styles from "../../styles/index.module.scss";
import {
	Contacts,
	Faq,
	FeaturesGrid,
	Goals,
	Hero,
	NavigationBar,
	SectionLayout,
} from "./components";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer/Footer";

const social_contacts: Record<string, string>[] = [
	{
		twitter: "https://twitter.com/",
	},
	{
		instagram: "https://www.instagram.com",
	},
	{
		facebook: "https://www.facebook.com/st1ll",
	},
	{
		linkedIn: "https://www.linkedin.com/in/dzmitry-ihnatovich-096b8a36/",
	},
];

const Home: NextPage = () => {
	const router = useRouter();

	const onClick = () => {
		router.push("/registration");
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Quick menu</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<nav className={styles.mainNav}>
				<NavigationBar onClick={onClick} />
			</nav>
			<main className={styles.main}>
				<Hero
					id="intro"
					className={clsx(styles.section, styles.intro)}
					onClick={onClick}
				/>
				<SectionLayout id="goals" separator={false}>
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
				{/* Prices section */}
				{/*<SectionLayout*/}
				{/*	id="prices"*/}
				{/*	title="Get awesome features, without extra charges"*/}
				{/*	subTitle="sub"*/}
				{/*	separator={false}*/}
				{/*>*/}
				{/*	<div className={styles.prices}>*/}
				{/*		<PriceCard />*/}
				{/*		<PriceCard />*/}
				{/*	</div>*/}
				{/*</SectionLayout>*/}
				{/*<SectionLayout*/}
				{/*	id="faq"*/}
				{/*	title="Frequently asked questions"*/}
				{/*	subTitle="The rise of mobile devices transforms the way we consume information entirely and we need to know how to use it."*/}
				{/*	separator={false}*/}
				{/*	className={styles.faq}*/}
				{/*	bottomMargin={false}*/}
				{/*>*/}
				{/*	<Faq data={questions} />*/}
				{/*</SectionLayout>*/}
			</main>

			<Footer />
		</div>
	);
};

export default Home;
