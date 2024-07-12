import React, { useState, createContext, useContext } from "react";
import Loading from "../layout/Loading";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setIsLoading }}>

            {console.log("isLoading: ", isLoading)}
            {isLoading && <Loading />}
            {children}
        </LoadingContext.Provider>
    )
}