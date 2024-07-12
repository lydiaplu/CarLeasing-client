import React, { useState, createContext, useContext } from 'react'
import ContentMessage from '../layout/ContentMessage'

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState("info");

    const showMessage = (msg, msgType = 'info', steady = false) => {
        setMessage(msg);
        setType(msgType);
        if (!steady) {
            setTimeout(() => setMessage(null), 3000);
        }
    }

    return (
        <MessageContext.Provider value={{ showMessage }}>
            <ContentMessage message={message} type={type} />
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider
