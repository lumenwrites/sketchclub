import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from 'react'

import { useModal } from 'context/ModalContext'

export default function Modal({ children, name, className="", nopadding=false }) {
  const { modal, toggleModal } = useModal()
  if (modal !== name) return null
  return (
    <div className={`modal-wrapper ${className}`}>
      <div className={`modal-card ${nopadding ? "nopadding" : ""}`}>
        <div className="close-button" onClick={() => toggleModal(name)}>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
        <div>{children}</div>
      </div>
      
      <div className="modal-bg" onClick={() => toggleModal(name)} />
    </div>
  )
}
