import React, { createContext, useContext, useEffect, useState } from 'react';
import { getRoles } from '../services/getRoles';
import AuthContext from './auth';

const RolesContext = createContext({});

export function RolesProvider({ children }) {

    const [roles, setRoles] = useState(null);
    const authContext = useContext(AuthContext);

    const handleGetRoles = async () => {
        if (!authContext) return;
        try {
            const roles = await getRoles({authContext: authContext});
            setRoles(roles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (authContext) {
            handleGetRoles();
        }
    }, [authContext]);

    return (
        <RolesContext.Provider value={{ roles }}>
            {children}
        </RolesContext.Provider>
    );
};

export default RolesContext;
