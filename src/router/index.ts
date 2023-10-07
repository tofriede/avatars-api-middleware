import Router, { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { imageFileNames, imageFilePaths } from '../lib/imageFiles';
import { combine, resize } from '../lib/imaging';
import FaceFactory, { Face } from '../lib/FaceFactory';

const imageTypes: Array<keyof Face> = ['eyes', 'nose', 'mouth'];

const router = Router();

const pngResponse = (response: Response) => {
  response.setHeader('Expires', new Date(Date.now() + 604800000).toUTCString());
  return response.type('image/png');
};

router.get('/list', (req, res) => {
  const face = {};
  imageTypes.forEach(type => (face[type] = imageFileNames(type)));

  res.set('Content-Type', 'application/json').send({ face });
});

router.get('/:size?/random', (req, res) => {
  const { size } = req.params;
  const face = FaceFactory.create(uuidv4());

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

router.get('/:size?/:id', (req, res) => {
  const { id, size } = req.params;
  const face = FaceFactory.create(id);

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

router.get('/face/:eyes/:nose/:mouth/:color/:size?', (req, res) => {
  const { color, size } = req.params;
  const face = { color: `#${color}` } as Face;

  imageTypes.forEach(type => {
    const requestedName = req.params[type];
    const paths = imageFilePaths(type);
    face[type] = paths.find(path => !!path.match(requestedName)) || paths[0];

    if (requestedName === 'x') {
      face[type] = '';
    }
  });

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

export default router;
