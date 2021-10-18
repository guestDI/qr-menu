import Image from "next/image"
import React, { useCallback, useMemo, useState } from "react"
import { InputCounter } from ".."
import { getCurrencySign } from "../../helpers/helpers"
import { Add } from "../../inline-img/svg"
import Button from "../Button/Button"
import classes from "./styles.module.css"

const DetailsView = () => {
  const [count, setCount] = useState(0)
  const currencySign = useMemo(() => getCurrencySign("USD" || ""), [])

  const increaseCount = useCallback(() => {
    setCount((prevState) => prevState + 1)
  }, [count])

  const decreaseCount = useCallback(() => {
    setCount((prevState) => prevState - 1)
  }, [count])

  return (
    <div className={classes.detailsContainer}>
      <div
        className={classes.imgContainer}
        style={{ display: "flex", alignSelf: "center" }}
      >
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
      <div className={classes.mainContainer}>
        <div className={classes.content}>
          <p className={classes.contentTitle}>Title</p>
          <p className={classes.contentDesc}>
            Mennu menu ingredientscsdasdasdasd asdasdasdasqwe
          </p>
        </div>
        <div className={classes.footer}>
          <span className={classes.footerPrice}>5 {currencySign}</span>
          {!count ? (
            <Button
              content={<Add width={22} height={22} />}
              onClick={increaseCount}
              round={true}
            />
          ) : (
            <InputCounter
              value={count}
              increaseCount={increaseCount}
              decreaseCount={decreaseCount}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailsView
