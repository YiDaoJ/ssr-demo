import express from 'express';
import dataValuesModel from '../models/datavalues';
import projectsModel from '../models/projects';

const router = express.Router();

router.get('/', (req, res) => {
  dataValuesModel.find().then(dataValues => res.json({dataValues}));
});

// router.get('/:project', (req, res) => {
//   // const projectId = projectsModel.findOne({ title: res.params.project })._id;

//   // dataValuesModel
//   //   .findOne({ project: projectId })
//   //   .then(doc => res.json({doc}));
  
// });

export default router;