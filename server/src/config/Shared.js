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
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        dialect: process.env.DIALECT,
        DB_NAME: process.env.DB_NAME,
        CUSTOMER_DB: process.env.CUSTOMER_DB_NAME,
    },

    filePath: "./public",

    token: {
        options: {
            expiresIn: 1 * 6000,
            algorithm: "HS256",
        },
        privateKey: process.env.PRIVATE_CLIENT_API_KEY,
    },

};
