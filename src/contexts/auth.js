import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});
import * as auth from '../services/auth'


export function AuthProvider({ children }) {

    const [access_token, setAccessToken] = useState(null);
    const [refresh_token, setRefreshToken] = useState(null);

    async function signIn({ username, password}) {
        const response = await auth.signIn({ username, password});
        if (response !== false) {
            setAccessToken(response.access_token);
            setRefreshToken(response.refresh_token);
            await AsyncStorage.setItem('@access_token', response.access_token);
            await AsyncStorage.setItem('@refresh_token', response.refresh_token);
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        async function loadStorageData() {
            const storagedAccessToken = await AsyncStorage.getItem('@access_token');
            const storagedRefreshToken = await AsyncStorage.getItem('@refresh_token');
            if (storagedAccessToken && storagedRefreshToken) {
                setAccessToken(storagedAccessToken);
                setRefreshToken(storagedRefreshToken);
            }
        }
        loadStorageData();
    });

    async function signOut() {
        await AsyncStorage.clear();
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!access_token, signIn, access_token, signOut, refresh_token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext