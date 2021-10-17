import Image from "next/image"
import React from "react"
import styles from "./styles.module.css"

const DetailsView = () => {
  return (
    <div className={styles.container}>
      <Image
        alt="Dishes"
        src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
        width={200}
        height={200}
        loading="eager" //check this property in future
        quality={50}
        //   className={styles.img}
      />
      <div className={styles.content}>Details</div>
      <div className={styles.footer}>Button</div>
    </div>
  )
}

export default DetailsView
