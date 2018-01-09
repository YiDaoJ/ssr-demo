import express from 'express';
import dataKeysModel from '../models/datakeys';

const router = express.Router();

router.get('/', (req, res) => {
  dataKeysModel.find().then(dataKeys => res.json({dataKeys}));
});

export default router;