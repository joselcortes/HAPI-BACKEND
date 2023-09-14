"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
class LoginController {
    constructor() {
        this.Login = (req, res) => {
            try {
                const { email, password } = req.body;
            }
            catch (error) {
            }
        };
    }
}
exports.LoginController = LoginController;
