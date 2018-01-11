import express from 'express';
import projectsModel from '../models/projects';

const router = express.Router();

router.get('/', (req, res) => {
  projectsModel
    .find()
    .populate('languages', 'name')
    .populate('data.datavalues', ['value', 'key'])
    // .then(projects => res.json({projects}));
    //{"projects":[{"_id":"TestProject","data":{"datavalues":["5a54d46b6534d01b4b00247f"],"datakeys":["GLOBAL__BTN_SAVE"]},"languages":["en"]}]}
    .then(projects => res.send(projects))
    // [{"_id":"TestProject","data":{"datavalues":["5a54d46b6534d01b4b00247f"],"datakeys":["GLOBAL__BTN_SAVE"]},"languages":["en"]}]
});

router.post('/', (req, res) => {
  console.log('req from project router: ', req.body)
  console.log('req from project router: ', req.body.project._id)
  projectsModel.create({_id: req.body.project._id})
    .then(project => res.json({project}))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
})

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
