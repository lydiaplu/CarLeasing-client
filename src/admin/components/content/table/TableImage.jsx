import React from 'react'

function TableImage({ src, desc="", isRounded=false }) {
    return (
        <img
            src={src}
            alt={desc}
            className={'table-img me-2'}
        />
    )
}

export default TableImage
