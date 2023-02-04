import React from 'react'

import './EntityModal.scss'

type Props = {
    onClose(): void
    children?: React.ReactNode
}

const EntityModal: React.FC<Props> = ({ children, onClose }) => {
    return (
        <div className="entityModal">
            <div className="entityModal__mask" role="presentation" onClick={onClose} />

            <div className="entityModal__contents">{children}</div>
        </div>
    )
}

export default EntityModal
