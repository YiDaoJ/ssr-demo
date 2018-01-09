import express from 'express';
import projectsModel from '../models/projects';

const router = express.Router();

router.get('/', (req, res) => {
  // const proj = projectsModel
  projectsModel
    .find()
    // .then(projects => proj = projects);
    .then(projects => res.json({projects}));

  // return projectsModel
});

router.get('/:title', (req, res) => {
  projectsModel
    .findOne({ _id: req.params.title })
    .then(project => res.json({project}));
});

router.get('/:title/languages', (req, res) => {
  projectsModel
    .findOne({ _id: req.params.title })
    .populate('languages', 'name')  // returns name only , _id default
    .exec((err, project) => {
      if(err) {
        console.log(err);
      } else {
        res.json(project.languages);
      }
    });
});

// get the datakeys in project
router.get('/:title/datakeys', (req, res) => {
  projectsModel
    .findOne({ _id: req.params.title })
    .populate('data.datakeys')
    .exec((err, project) => {
      if(err) {
        console.log(err);
      } else {
        res.json(project.data.datakeys);
      }
    });
});


router.get('/:title/datavalues', (req, res) => {
  projectsModel
    .findOne({ _id: req.params.title })
    .populate('data.datavalues')
    .exec((err, project) => {
      if(err) {
        console.log(err);
      } else {
        res.json(project.data.datavalues);
      }
    });
});

export default router;
