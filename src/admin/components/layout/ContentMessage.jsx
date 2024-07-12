import React from 'react'

// type: info, danger, warning
function ContentMessage({ message, type }) {
    if(!message) return null;
    
    return (
        <div className="col-12">
            <div className={`callout callout-${type}`}>
                {message}
            </div>
        </div>
    )
}

export default ContentMessage
