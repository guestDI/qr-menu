import React, { useMemo } from 'react'
import { Card, CategoriesPanel } from '../components'
import styles from '../../styles/Menu.module.css'
import menu from '../../__fixtures__/menu.json'
import { Element } from 'react-scroll'

const openDetails = (id: string | number) => {
  console.log(id)
}

const addToBasket = (id: string | number) => {
  console.log('added', id)
}

const renderCards = (items: Array<Record<string, any>>) => {
  return items.map(({ uid, name, priceCurrency }) => (
    <Card
      key={uid}
      name={name}
      price="5.50"
      priceCurrency={priceCurrency}
      onCardClick={() => openDetails(uid)}
      shortDescription="Shorttt sd fs fsd fsd fs fs fs fs df dfs sdfsdfsdf sdf s"
      addToBasket={() => addToBasket(uid)}
    />
  ))
}

const Menu: React.FC = () => {
  const categories = useMemo(
    () => menu.map((menuItem) => menuItem.category),
    [],
  )

  const menuCards = menu.map((menuItem, i) => {
    return (
      <Element
        key={menuItem.category}
        id={menuItem.category}
        name={menuItem.category}
      >
        <section className={styles.categoryContainer}>
          <h1 className={styles.categoryTitle}>{menuItem.category}</h1>
          <div className={styles.cardsContainer}>
            {renderCards(menuItem.items)}
          </div>
        </section>
      </Element>
    )
  })

  return (
    <div className={styles.container}>
      <CategoriesPanel onClick={() => {}} categories={categories} />
      {menuCards}
    </div>
  )
}

export default Menu
