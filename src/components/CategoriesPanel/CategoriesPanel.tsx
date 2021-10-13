import React from 'react'
import styles from './styles.module.css'

interface CategoriesPanelProps {
  categories: string[]
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({ categories }) => {
  return (
    <ul className={styles.container}>
      {categories.map((category, i) => (
        <li key={i}>{category}</li>
      ))}
    </ul>
  )
}

export default CategoriesPanel
