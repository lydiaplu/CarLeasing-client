import React from 'react'

import ContentHeader from './ContentHeader'
import { MessageProvider } from '../providers/MessageProvider'
import { LoadingProvider } from '../providers/LoadingProvider'

function ContentMain({ children }) {
    return (
        <main className="app-main">
            <ContentHeader />

            <div className="app-content">
                <div className="container-fluid">
                    <LoadingProvider>
                        <MessageProvider>
                            {children}
                        </MessageProvider>
                    </LoadingProvider>
                </div>
            </div>
        </main>
    )
}

export default ContentMain
