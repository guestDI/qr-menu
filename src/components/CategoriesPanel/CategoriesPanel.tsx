import { Link, Button } from 'react-scroll'
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
    <ul ref={ref} className={styles.container}>
      {categories.map((category, i) => (
        <Link
          key={i}
          activeClass={styles.active}
          to={category}
          offset={-130}
          duration={500}
          spy={true}
          smooth={true}
        >
          {category}
        </Link>
      ))}
    </ul>
  )
}

export default CategoriesPanel
