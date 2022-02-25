import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeCollection, setActiveCollection] = useState(false);
    const [activeCollectionNfts, setActiveCollectionNfts] = useState(false);

    return (
        <UserContext.Provider
            value={{
                showModal,
                setShowModal,
                activeCollection,
                setActiveCollection,
                activeCollectionNfts,
                setActiveCollectionNfts,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
