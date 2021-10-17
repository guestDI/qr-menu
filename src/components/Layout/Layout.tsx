import React from "react"
import styles from "./styles.module.css"

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>Hello</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className="col item social">
          <a href="#">
            <i className="icon ion-social-facebook"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-twitter"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-snapchat"></i>
          </a>
          <a href="#">
            <i className="icon ion-social-instagram"></i>
          </a>
        </div>
        <p className={styles.company}>
          Copyright &copy; 2021 The RvDi Company.
        </p>
      </footer>
    </div>
  )
}

export default Layout
