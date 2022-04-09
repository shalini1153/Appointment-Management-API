import crypto from "crypto-js";
import config from "../../config/Index";

const Crypto = () => {
    const omnivoreKey = config.omnivore.apiSecret;
    const main = crypto;

    return {
        encrypt: (key => text => crypto.AES.encrypt(text, key).toString())(
            omnivoreKey
        ),

        decrypt: (key => hash =>
            crypto.AES.decrypt(hash, key).toString(crypto.enc.Utf8))(
            omnivoreKey
        ),
        main,
    };
};

export default Crypto();
