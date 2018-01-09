import express from 'express';
import languagesModel from '../models/languages';

const router = express.Router();

router.get('/', (req, res) => {
  languagesModel.find().then(languages => res.json({languages}));
});

export default router;