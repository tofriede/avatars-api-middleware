"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceFactory = void 0;
const avatars_utils_1 = require("avatars-utils");
const imageFiles_1 = require("./imageFiles");
class FaceFactory {
    constructor(colors, eyes, noses, mouths) {
        this.colorHash = new avatars_utils_1.Hash(colors);
        this.eyeHash = new avatars_utils_1.Hash(eyes);
        this.noseHash = new avatars_utils_1.Hash(noses);
        this.mouthHash = new avatars_utils_1.Hash(mouths, (0, avatars_utils_1.hashFactory)(avatars_utils_1.sumAndDiff));
    }
    create(string) {
        return {
            color: this.colorHash.get(string),
            eyes: this.eyeHash.get(string),
            nose: this.noseHash.get(string),
            mouth: this.mouthHash.get(string),
        };
    }
}
exports.FaceFactory = FaceFactory;
const defaultColors = [
    '#81bef1',
    '#ad8bf2',
    '#bff288',
    '#de7878',
    '#a5aac5',
    '#6ff2c5',
    '#f0da5e',
    '#eb5972',
    '#f6be5d',
];
exports.default = new FaceFactory(defaultColors, imageFiles_1.eyeImages, imageFiles_1.noseImages, imageFiles_1.mouthImages);
