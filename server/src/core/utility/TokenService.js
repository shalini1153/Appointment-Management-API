import * as jwt from "jsonwebtoken"; 

export default class TokenService {

   constructor(_privateKey,_options){
    TokenService.options = _options;
    TokenService.privateKey = _privateKey;
    }

    sign(payload,privateKey, options){
        return jwt.sign(payload,  privateKey, options);    
    }
    verify(token) {
        return jwt.verify(token, this.privateKey, this.options);            
    }
    decode(token) {
        return jwt.decode(token, { complete: true });
    }
}


