/* eslint-disable no-useless-escape */

// All configurations will extend these options
// ============================================
import dotenv from "dotenv";
dotenv.config();

export const config = {
    apiName: "Appointment Management App",
    apiBaseUri: "/appointment/api",
    env: process.env.NODE_ENV,
    corsoptions: {
        origin: process.env.CORSURL,
        methods: "GET,POST,PATCH,PUT,DELETE",
        allowedHeaders:
            "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token,x-client-secret, Authorization,Access-Control-Allow-Origin",
    },

    // Server port
    port: process.env.PORT || 3000,

    // Server IP
    ip: process.env.IP || "0.0.0.0",

    // Domain (e.g. https://localhost)
    domain: process.env.DOMAIN,

    logoutExpTime: process.env.LOGOUTEXPTIME,

    // Lifetime for session
    expiresIn: {
        session: 1 * 60,
    },

    serverUrl: process.env.SERVER_URL,
    //custom logger
    log: Boolean(process.env.LOG),
    
    dbDetails: {
        URL: process.env.MONGO_URI,
    },

    filePath: "./public",

    token: {
        options: {
            expiresIn: 1 * 6000,
            algorithm: "HS256",
        },
        privateKey: 'privatetoken',
    },

    healthAPI: {
        url: 'https://api.1up.health/user-management/v1/user/auth-code',
        app_user_id: 'shalini_jain',
        client_id: 'ba10613b1033af0f1f27033779f3bf2a',
        client_secret: '52e9f913a4e81c874cf2a6fbb4c3b367',
        token_url: 'https://auth.1up.health/oauth2/token'
    }

};
