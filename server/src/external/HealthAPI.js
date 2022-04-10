
import HttpRequest from "../core/utility/HttpRequest";
import config from "../config/Index";

export class HealthAPI {

    constructor() {
        this.httpReq = new HttpRequest;
        this.headers = {
            headers: {}
        }
    }

    async generateAuthorizationCode() {
        const { url, app_user_id, client_id, client_secret } = config.healthAPI
        const api_url = `${url}?app_user_id=${app_user_id}&client_id=${client_id}&client_secret=${client_secret}`
        return new Promise((resolve, reject) => {
            this.httpReq.create(api_url, {
            }, this.headers)
                .then(res => resolve(res)).catch(err => {
                    reject(err)
                });
        });
    }

    async getAccessToken(body) {
        const { token_url } = config.healthAPI
        return new Promise((resolve, reject) => {
            this.httpReq.create(token_url, body, this.headers)
                .then(res => resolve(res)).catch(err =>
                    reject(err));
        });
    }

    async searchDoctor(url, body) {
        return new Promise((resolve, reject) => {
            this.httpReq.create(url, body, this.headers)
                .then(res => resolve(res)).catch(err =>
                    reject(err));
        });
    }

}
