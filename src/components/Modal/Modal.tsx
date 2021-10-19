import clsx from "clsx"
import React, { useCallback, useEffect, useMemo } from "react"
import { Close } from "../../inline-img/svg"
import styles from "./styles.module.css"
import Button from "../Button/Button"

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
  closeOnBackdrop?: boolean
  className?: string
  placement: "center" | "bottom"
}

const ModalOverlay: React.FC<ModalProps> = ({
  show,
  onClose,
  className,
  children,
  closeOnBackdrop = "true",
  placement,
}) => {
  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
      e.stopPropagation()
      onClose()
    },
    [onClose],
  )

  const displayStyle = useMemo(
    () => (show ? styles.displayBlock : styles.displayNone),
    [show],
  )

  return (
    <>
      <div
        onClick={closeOnBackdrop ? handleClose : () => {}}
        className={clsx(styles.modal, displayStyle)}
      >
        <Button
          className={styles.btnClose}
          round={true}
          onClick={handleClose}
          content={<Close width={20} height={20} />}
        />
      </div>
      <section
        className={clsx(
          styles.modalMain,
          styles[placement],
          displayStyle,
          className,
        )}
      >
        {children}
      </section>
    </>
  )
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  className,
  children,
  placement = "center",
}) => {
  // hack to prevent scrolling when modal is open
  useEffect(() => {
    const overflowState = show ? "hidden" : "unset"
    document.body.style.overflow = overflowState
  }, [show])

  return (
    <ModalOverlay
      placement={placement}
      onClose={onClose}
      show={show}
      className={className}
    >
      {children}
    </ModalOverlay>
  )
}

export default Modal
