import React, { useCallback, useRef } from 'react'
import styles from './styles.module.css'

interface CategoriesPanelProps {
  onClick: (category: string) => void
  categories: string[]
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
  categories,
  onClick,
}) => {
  const ref = useRef<any>(null)

  // const handleScroll = useCallback((direction: "right" | "left") => {
  //   if(direction === "left") {
  //     ref?.current ? (ref.current.scrollLeft -= 50) : null
  //   } else {
  //     ref?.current ? (ref.current.scrollLeft += 50) : null
  //   }
  // }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <div onClick={() => handleScroll("left")}>{' < '}</div> */}
      <ul ref={ref} className={styles.container}>
        {categories.map((category, i) => (
          <li onClick={() => onClick(category)} key={i}>
            {category}
          </li>
        ))}
      </ul>
      {/* <div onClick={() => handleScroll("right")}>{' > '}</div> */}
    </div>
  )
}

export default CategoriesPanel
