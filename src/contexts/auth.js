import React, { createContext, useState } from "react";

const AuthContext = createContext({});
import * as auth from '../services/auth'

export function AuthProvider({ children }) {

    const [access_token, setAccessToken] = useState(null);

    async function signIn({ username, password}) {
        const response = await auth.signIn({ username, password});
        setAccessToken(response.access_token);
        if (response !== false) {
            return true
        } else {
            return false
        }
    }

    function signOut() {
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!access_token, signIn, access_token, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext