import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Button,
  Card,
  CategoriesPanel,
  Modal,
  DetailsView,
} from "../components"
import styles from "../../styles/Menu.module.css"
import { Element, animateScroll as scroll } from "react-scroll"
import { ChevronDoubleUp } from "../inline-img/svg"
import { useDataLayerContext } from "../context/DataLayerContext"

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

  return (
    <div className={styles.container}>
      <CategoriesPanel categories={categories} />
      {menuCards}
      {showBackToTopButton && (
        <Button
          content={<ChevronDoubleUp height={24} />}
          onClick={() => scroll.scrollToTop()}
          round={true}
          size="lg"
          className={styles.backToTop}
        />
      )}
      <Modal
        onClose={toggleModal}
        show={showModal}
        className={styles.modalContent}
      >
        <DetailsView selectedItem={selectedMenuItem} />
      </Modal>
    </div>
  )
}

export default Menu
