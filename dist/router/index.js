"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const imageFiles_1 = require("../lib/imageFiles");
const imaging_1 = require("../lib/imaging");
const FaceFactory_1 = __importDefault(require("../lib/FaceFactory"));
const imageTypes = ['eyes', 'nose', 'mouth'];
const router = (0, express_1.default)();
const pngResponse = (response) => {
    response.setHeader('Expires', new Date(Date.now() + 604800000).toUTCString());
    return response.type('image/png');
};
router.get('/list', (req, res) => {
    const face = {};
    imageTypes.forEach(type => (face[type] = (0, imageFiles_1.imageFileNames)(type)));
    res.set('Content-Type', 'application/json').send({ face });
});
router.get('/:size?/random', (req, res) => {
    const { size } = req.params;
    const face = FaceFactory_1.default.create((0, uuid_1.v4)());
    (0, imaging_1.combine)(face)
        .png()
        .pipe((0, imaging_1.resize)(size))
        .pipe(pngResponse(res));
});
router.get('/:size?/:id', (req, res) => {
    const { id, size } = req.params;
    const face = FaceFactory_1.default.create(id);
    (0, imaging_1.combine)(face)
        .png()
        .pipe((0, imaging_1.resize)(size))
        .pipe(pngResponse(res));
});
router.get('/face/:eyes/:nose/:mouth/:color/:size?', (req, res) => {
    const { color, size } = req.params;
    const face = { color: `#${color}` };
    imageTypes.forEach(type => {
        const requestedName = req.params[type];
        const paths = (0, imageFiles_1.imageFilePaths)(type);
        face[type] = paths.find(path => !!path.match(requestedName)) || paths[0];
        if (requestedName === 'x') {
            face[type] = '';
        }
    });
    (0, imaging_1.combine)(face)
        .png()
        .pipe((0, imaging_1.resize)(size))
        .pipe(pngResponse(res));
});
exports.default = router;
