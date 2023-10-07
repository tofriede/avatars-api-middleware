"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouthImages = exports.noseImages = exports.eyeImages = exports.imageFileNames = exports.imageFilePaths = void 0;
const path_1 = __importDefault(require("path"));
const avatars_utils_1 = require("avatars-utils");
const imageDir = path_1.default.join(__dirname, '..', 'img');
const imageFilePaths = (type) => (0, avatars_utils_1.filePaths)(path_1.default.join(imageDir, type));
exports.imageFilePaths = imageFilePaths;
const imageFileNames = (type) => (0, avatars_utils_1.fileNames)(path_1.default.join(imageDir, type));
exports.imageFileNames = imageFileNames;
exports.eyeImages = (0, exports.imageFilePaths)('eyes');
exports.noseImages = (0, exports.imageFilePaths)('nose');
exports.mouthImages = (0, exports.imageFilePaths)('mouth');
