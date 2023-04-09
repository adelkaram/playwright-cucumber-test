import { HMSUser } from "../models/hms-user.model";

export class UserFactory {
    private _username: string = "admin";
    private _password: string = "Adm1n1234";
    private _role: string = "admin";

    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    set user(hmsuser: HMSUser) {
        this._username = hmsuser.userName;
        this._password = hmsuser.password;
    }
    get user(): HMSUser {
        return {
            userName: this.username,
            password: this.password
        };
    }
}