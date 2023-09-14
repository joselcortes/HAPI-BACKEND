"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("../../routes");
const conexion_database_1 = __importDefault(require("../../database/conexion.database"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        // process.env.PORT = '3003';
        // process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
        this.objConexion = new conexion_database_1.default();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set("port", process.env.PORT || 3003);
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            exposedHeaders: ['Authorization']
        }));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
        this.app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'dist/assets/img')));
    }
    routes() {
        (0, routes_1.endPoints)(this.app);
    }
    conexionDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.objConexion.getConnection();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    iniciarServidor() {
        this.app.listen(this.app.get("port"), () => {
            console.log("SERVER UP PORT " + this.app.get("port"));
            console.log(process.env.PORT);
        });
    }
}
exports.Server = Server;
