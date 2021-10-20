import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Button,
  Card,
  CategoriesPanel,
  Modal,
  DetailsView,
  ShoppingCart,
} from "../components"
import styles from "../../styles/Menu.module.css"
import { Element, animateScroll as scroll } from "react-scroll"
import { ChevronDoubleUp, ShoppingBag } from "../inline-img/svg"
import { useDataLayerContext } from "../context/DataLayerContext"
import clsx from "clsx"

const addToBasket = (category: string, id: string | number) => {
  console.log("added", category, id)
}

const renderCards = (
  category: string,
  items: Array<Record<string, any>>,
  onCardClick: (category: string, id: string | number) => void,
) => {
  return items.map(
    ({ uid, name, price, priceCurrency, shortDescription = "" }) => (
      <Card
        key={uid}
        name={name}
        price={price}
        priceCurrency={priceCurrency}
        onCardClick={() => onCardClick(category, uid)}
        shortDescription={shortDescription}
        addToBasket={() => addToBasket(category, uid)}
      />
    ),
  )
}

const Menu: React.FC = () => {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false)
  const [showCartButton, setShowCartButton] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { items } = useDataLayerContext()
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    Record<string, string | number>
  >({})

  const setButtonState = useCallback(() => {
    if (window.pageYOffset > 350) {
      setShowBackToTopButton(true)
    } else {
      setShowBackToTopButton(false)
    }
  }, [])

  const toggleModal = useCallback(
    (category?: string, itemId?: string | number) => {
      setShowModal((prevState) => !prevState)
      if (category && itemId) {
        setSelectedMenuItem({ category, itemId })
      } else {
        setSelectedMenuItem({})
      }
    },
    [showModal],
  )

  // TODO: check how to avaoid re-render on button appearence
  useEffect(() => {
    window.addEventListener("scroll", setButtonState)

    return () => window.removeEventListener("scroll", setButtonState)
  }, [setButtonState])

  const categories = useMemo(
    () => items.map((menuItem: any) => menuItem.category),
    [items],
  )

  const menuCards = items.map((menuItem: any, i: number) => {
    return (
      <Element key={i} id={menuItem.category} name={menuItem.category}>
        <section className={styles.categoryContainer}>
          <h1 className={styles.categoryTitle}>{menuItem.category}</h1>
          <div className={styles.cardsContainer}>
            {renderCards(menuItem.category, menuItem.items, toggleModal)}
          </div>
        </section>
      </Element>
    )
  })

  const itemIsSelected = !!Object.keys(selectedMenuItem).length
  const placement = itemIsSelected ? "center" : "bottom"
  const modalContent = itemIsSelected ? (
    <DetailsView selectedItem={selectedMenuItem} />
  ) : (
    <ShoppingCart />
  )

  return (
    <div className={styles.container}>
      <CategoriesPanel categories={categories} />
      {showCartButton && (
        <Button
          content={<ShoppingBag height={24} />}
          onClick={toggleModal}
          round={true}
          size="lg"
          className={clsx(styles.floatBtn, styles.shoppingCart)}
        />
      )}
      {menuCards}
      {showBackToTopButton && (
        <Button
          content={<ChevronDoubleUp height={24} />}
          onClick={() => scroll.scrollToTop()}
          round={true}
          size="lg"
          className={clsx(styles.floatBtn, styles.backToTop)}
        />
      )}
      <Modal
        onClose={toggleModal}
        show={showModal}
        className={clsx(
          placement === "center" ? styles.modalCenter : styles.modalBottom,
        )}
        placement={placement}
      >
        {modalContent}
      </Modal>
    </div>
  )
}

export default Menu
