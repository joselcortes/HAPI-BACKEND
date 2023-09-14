"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearImagen = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function crearImagen(req, res, next) {
    app.use('/assets/img', express_1.default.static(path_1.default.join(__dirname, '../assets/img')));
    const storage = multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path_1.default.join(__dirname, '../assets/img'));
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    });
    const upload = (0, multer_1.default)({ storage: storage });
}
exports.crearImagen = crearImagen;
