import Image from "next/image"
import React, { useMemo } from "react"
import { getCurrencySign } from "../../helpers/helpers"
import Button from "../Button/Button"
import classes from "./styles.module.css"

const DetailsView = () => {
  const currencySign = useMemo(() => getCurrencySign("USD" || ""), [])

  return (
    <div className={classes.detailsContainer}>
      <div className={classes.imgContainer} style={{ margin: "0 auto" }}>
        <Image
          alt="Dishes"
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mexican-chicken-burger_1-b5cca6f.jpg?quality=90&resize=440,400"
          width={300}
          height={300}
          loading="eager" //check this property in future
          quality={50}
          className={classes.img}
        />
      </div>
      <div className={classes.content}>
        <p className={classes.contentTitle}>Title</p>
        <p className={classes.contentDesc}>Mennu menu ingredients</p>
      </div>
      <div className={classes.footer}>
        <span className={classes.footerPrice}>5 {currencySign}</span>
        <Button onClick={() => {}} content="Add" />
      </div>
    </div>
  )
}

export default DetailsView
