import clsx from "clsx"
import React, { useCallback, useEffect } from "react"
import { Close } from "../../inline-img/svg"
import styles from "./styles.module.css"
import Button from "../Button/Button"

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnBackdrop?: boolean
  className?: string
}

const ModalOverlay: React.FC<ModalProps> = ({
  show,
  onClose,
  className,
  children,
  closeOnBackdrop = "true"
}) => {
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
      e.stopPropagation()
      onClose()
    },
    [onClose],
  )

  return (
    <div
      onClick={closeOnBackdrop ? handleClose : () => {}}
      className={clsx(
        styles.modal,
        show ? styles.displayBlock : styles.displayNone,
      )}
    >
      <Button
        className={styles.btnClose}
        round={true}
        onClick={handleClose}
        content={<Close width={20} height={20} />}
      />
      <section className={clsx(styles.modalMain, className)}>
        {children}
      </section>
    </div>
  )
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  className,
  children,
}) => {
  // hack to prevent scrolling when modal is open
  useEffect(() => {
    const overflowState = show ? "hidden" : "unset"
    document.body.style.overflow = overflowState
  }, [show])

  return (
    <ModalOverlay onClose={onClose} show={show} className={className}>
      {children}
    </ModalOverlay>
  )
}

export default Modal
