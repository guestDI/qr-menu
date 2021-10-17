import clsx from "clsx"
import React from "react"
import { Close } from "../../inline-img/svg"
import styles from "./styles.module.css"
import Button from "../Button/Button"

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalOverlay: React.FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <div
      className={clsx(
        styles.modal,
        show ? styles.displayBlock : styles.displayNone,
      )}
    >
      <Button
        className={styles.btnClose}
        round={true}
        onClick={onClose}
        content={<Close width={20} height={20} />}
      />
      <section className={styles.modalMain}>{children}</section>
    </div>
  )
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <ModalOverlay onClose={onClose} show={show}>
      {children}
    </ModalOverlay>
  )
}

export default Modal
