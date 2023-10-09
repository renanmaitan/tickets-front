import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Components/Loading";
import { getLoggedUser } from "../services/getLoggedUser";

const AuthContext = createContext({});
import * as auth from '../services/auth'


export function AuthProvider({ children }) {

    const [access_token, setAccessToken] = useState(null);
    const [refresh_token, setRefreshToken] = useState(null);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);

    const handleGetLoggedUser = async (access_token) => {
        try {
            const user = await getLoggedUser({ access_token: access_token, refreshToken: refreshToken, signOut: signOut });
            setLoggedUser(user);
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async function signIn({ username, password }) {
        const response = await auth.signIn({ username, password });
        if (response !== false) {
            setAccessToken(response.access_token);
            setRefreshToken(response.refresh_token);
            setUser(username);
            setPassword(password);
            await AsyncStorage.setItem('@access_token', response.access_token);
            await AsyncStorage.setItem('@refresh_token', response.refresh_token);
            await AsyncStorage.setItem('@username', username);
            await AsyncStorage.setItem('@password', password);
            const user = await handleGetLoggedUser(response.access_token);
            await AsyncStorage.setItem('@loggedUser', JSON.stringify(user));
            return true
        } else {
            return false
        }
    }

    // useEffect(() => {
    //     if (access_token) {
    //         const timer = setInterval(async () => {
    //             const new_token = await refreshToken();
    //             if (new_token) {
    //                 setAccessToken(new_token);
    //                 const user = await handleGetLoggedUser(new_token);
    //                 await AsyncStorage.setItem('@loggedUser', JSON.stringify(user));
    //             } else {
    //                 signOut();
    //             }
    //         }, 300000);
    //         return () => clearInterval(timer);
    //     }
    // }, [access_token]);

    async function refreshToken() {
        const username = await AsyncStorage.getItem('@username');
        const password = await AsyncStorage.getItem('@password');
        if (username && password) {
            const response = await auth.signIn({ username, password });
            if (response !== false) {
                setAccessToken(response.access_token);
                setRefreshToken(response.refresh_token);
                await AsyncStorage.setItem('@access_token', response.access_token);
                await AsyncStorage.setItem('@refresh_token', response.refresh_token);
                return response.access_token
            } else {
                return false
            }
        }
        else {
            return false
        }
    }

    useEffect(() => {
        async function loadStorageData() {
            const storagedAccessToken = await AsyncStorage.getItem('@access_token');
            const storagedRefreshToken = await AsyncStorage.getItem('@refresh_token');
            const storagedLoggedUser = await AsyncStorage.getItem('@loggedUser');
            if (storagedAccessToken && storagedRefreshToken && storagedLoggedUser) {
                setAccessToken(storagedAccessToken);
                setRefreshToken(storagedRefreshToken);
                setLoggedUser(JSON.parse(storagedLoggedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signOut() {
        await AsyncStorage.clear();
        setAccessToken(null);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{ signed: !!access_token, signIn, access_token, signOut, refresh_token, refreshToken, loggedUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext