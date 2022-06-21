import styles from "./styles.module.scss"

const PriceCard: React.FC = () => {
	// let popular = (
	//     props.popular ? <span className={styles["pricing_popular"]}>Popular</span>
	//     : null
	// )

	return (
		<div className={styles.pricing}>
			<div className={styles.head}>
				<span className={styles.popular}>Popular</span>
				<div className={styles["price-wrapper"]}>
					<span className={styles.price}>$56</span>
					<span className={styles.duration}>/month</span>
				</div>
			</div>
			<ul className={styles["pricing_content"]}>
				<li>
					<p>Работайте с системой без каких-либо ограничений</p>
				</li>
				<hr />
				<li>
					<p>Регистрация неограниченного числа клиентов</p>
				</li>
				<hr />
				<li>
					<p>Мобильный клиент с возможностью испольлзовать онлайн абонемент</p>
				</li>
				<hr />
				<li>
					<p>Формирование отчетности без каких-либо ограничений</p>
				</li>
				<hr />
				<li>
					<p>Круглосуточная поддержка</p>
				</li>
			</ul>
		</div>
	)
}

export default PriceCard
