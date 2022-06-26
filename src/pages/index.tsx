import clsx from "clsx"
import type { NextPage } from "next"
import Head from "next/head"
// import { SocialContacts } from "../types"
import styles from "../../styles/index.module.scss"
import {
	Contacts,
	Faq,
	Hero,
	NavigationBar,
	PriceCard,
	SectionLayout,
} from "./components"

const social_contacts: any = [
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
]

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Quick menu</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<nav className="navbar navbar-fixed-top mainNav">
				<NavigationBar />
			</nav>
			<main className={styles.main}>
				<Hero id="intro" className={clsx(styles.section, styles.intro)} />
				{/* Prices section */}
				<SectionLayout
					id="prices"
					title="Get awesome features, without extra charges"
					subTitle="sub"
				>
					<div className={styles.prices}>
						<PriceCard />
						<PriceCard />
					</div>
				</SectionLayout>

				{/* Satisfaction section */}
				<section id="prices" className={styles.section}>
					<div className="container">
						<div className="row row-centered">
							<div className="col-md-8 col-centered section-header">
								<h1 className="text-upper-case">satisf</h1>
								<hr />
							</div>
						</div>
						<div className="row price-row">
							<div className="col-xs-12 col-sm-4 price_col">
								{/* <PriceComponent price="Бесплатно" tariffName="Базовый" popular={true} onClick={this.onSignUpCall} duration="30 дней"/> */}
							</div>
							{/*<div className="col-xs-12 col-sm-4 price_col">*/}
							{/*<PriceComponent popular tariffName="Standart" onClick={this.onSignUpCall}/>*/}
							{/*</div>*/}
							{/*<div className="col-xs-12 col-sm-4 price_col">*/}
							{/*<PriceComponent tariffName="Premium" onClick={this.onSignUpCall}/>*/}
							{/*</div>*/}
						</div>
					</div>
				</section>
				<SectionLayout id="faq" title="Frequently asked questions">
					<Faq />
				</SectionLayout>
				{/* <p className={styles.description}>
					Get started by editing{" "}
					<code className={styles.code}>pages/index.js</code>
				</p>

				<div className={styles.grid}>
					<a href="https://nextjs.org/docs" className={styles.card}>
						<h2>Documentation &rarr;</h2>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className={styles.card}>
						<h2>Learn &rarr;</h2>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/master/examples"
						className={styles.card}
					>
						<h2>Examples &rarr;</h2>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={styles.card}
					>
						<h2>Deploy &rarr;</h2>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div> */}
			</main>

			<footer
				id="contact"
				className={clsx(styles["footer-base-color"], styles["contact-section"])}
			>
				<div className="container">
					<div className="row row-centered">
						<div className="col-md-3 contact-section__contacts">
							{/* <Contacts /> */}
						</div>
						{/*<div className="col-md-3 contact-section__about">*/}
						{/*<AboutUs about_links={about_links}/>*/}
						{/*</div>*/}
					</div>
					<div className="row row-centered social_icons">
						<Contacts contacts={social_contacts} />
					</div>
					<hr />
					<div className="copyright">© 2022 DI team, made with love</div>
					<div className="scroll_top">
						<div className="scroll_top__button" style={{ display: "block" }}>
							<span className="tooltip">Scroll To Top</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home
