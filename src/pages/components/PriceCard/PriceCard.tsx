import styles from "./styles.module.css"

const PriceCard: React.FC = () => {
	// let popular = (
	//     props.popular ? <span className={styles["pricing_popular"]}>Popular</span>
	//     : null
	// )

	return (
		<div className={styles.pricing}>
			<span className={styles["pricing_popular"]}>Popular</span>
			<div className={styles["pricing_head"]}>
				<span className={styles["price_title"]}>Name</span>
				<div className={styles.price}>
					<h4>
						56
						<span className={styles.duration}>40</span>
					</h4>
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
