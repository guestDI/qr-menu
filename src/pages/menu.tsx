import React, { useMemo } from 'react'
import { Card } from '../components'
import styles from '../../styles/Menu.module.css'

const arr = [
  {
    uid: 1,
    name: 'Soup with frikadels cand mushrooms very tasty',
    priceCurrency: 'USD',
  },
  { uid: 2, name: 'Meat', priceCurrency: 'EURO' },
  { uid: 3, name: 'Chicken', priceCurrency: 'POUND' },
  { uid: 4, name: 'Something else', priceCurrency: 'ROUBLE' },
  { uid: 5, name: 'New' },
]

const openDetails = (id: string | number) => {
  console.log(id)
}

const addToBasket = (id: string | number) => {
  console.log('added', id)
}

const Menu: React.FC = () => {
  const menuCards = useMemo(() => {
    return arr.map(({ uid, name, priceCurrency }) => (
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
  }, [arr])

  return <div className={styles.container}>{menuCards}</div>
}

export default Menu
