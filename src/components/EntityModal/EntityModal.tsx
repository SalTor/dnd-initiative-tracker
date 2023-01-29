import React from 'react'

import './EntityModal.scss'

const EntityModal = props => {
    if (props.isOpen) {
        return (
            <div className="entityModal">
                <div className="entityModal__mask" role="presentation" onClick={props.onClose} />

                <div className="entityModal__contents">{props.children}</div>
            </div>
        )
    }

    return null
}

export default EntityModal
