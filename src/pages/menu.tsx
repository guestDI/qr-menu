import React, { useMemo } from 'react'
import { Card } from '../components'
import styles from '../../styles/Menu.module.css'

const arr = [
  { uid: 1, name: 'Soup' },
  { uid: 2, name: 'Meat' },
  { uid: 3, name: 'Chicken' },
  { uid: 4, name: 'Something else' },
  { uid: 5, name: 'New' },
]

const Menu: React.FC = () => {
  const menuCards = useMemo(() => {
    return arr.map((item) => (
      <Card
        key={item.uid}
        name={item.name}
        price="5.50"
        shortDescription="Shorttt sd fs fsd fsd fs fs fs fs df dfs sdfsdfsdf"
      />
    ))
  }, [arr])

  return <div className={styles.container}>{menuCards}</div>
}

export default Menu
