import express from 'express';
import projectsModel from '../models/projects';

const router = express.Router()

const formatProject = data => {
  const formatedProjects = []
  data.forEach(proj => {

    const formatProject = {}
    const projectData = proj.data

    formatProject._id = proj._id;
    formatProject.data = projectData.datavalues;
    formatProject.languages = proj.languages;

    formatedProjects.push(formatProject)
  })
  return formatedProjects
}

// read
router.get('/', (req, res) => {

  projectsModel
    .find()
    .populate('languages', '_id')
    .populate('data.datavalues', ['value', 'key', 'language', 'project'])
    .exec((err, data) => {
      if (err) return
      console.log(err);

      // data.forEach(proj => {

      //   const formatProject = {}
      //   const projectData = proj.data

      //   formatProject._id = proj._id;
      //   formatProject.data = projectData.datavalues;
      //   formatProject.languages = proj.languages;

      //   formatedProjects.push(formatProject)
      // })

      const formatedProjects = formatProject(data)
      res.json(formatedProjects)
    })
});


// create
router.post('/', (req, res) => {
  projectsModel.create({_id: req.body.project._id})
    .then(project => res.json(project))
    .catch(err => res.status(400).json(err));
})

// remove / delete
router.delete('/', (req, res) => {
  projectsModel
    .findOneAndRemove({_id: req.query._id})
    .then(project=> res.json(project))
    .catch(err => res.status(400).json(err));
})

// update
router.put('/', (req, res) => {
  // console.log('test from route: ', req.body)

  projectsModel
    .findOneAndUpdate({_id: req.body._id}, { $set: {  }}, {new: true})
    // .findByIdAndUpdate(req.query._id, projectsModel.updateProject, {new: true})
    // .exec((err, project) => {
    //   if (err) return
    //   console.log(err);

    //   // console.log(project)
    //   res.json(project)
    // })
    .then(project=> res.json(project))
    .catch(err => res.status(400).json(err));
})

router.get('/:title', (req, res) => {
  projectsModel
    .findOne({ _id: req.params.title })
    .populate('languages', '_id')
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


// .populate({ path: 'data.datavalues', select: 'value' })
// .populate('data.datavalues', ['value', 'key', 'language'])
// .then(projects => res.json({projects}));
//{"projects":[{"_id":"TestProject","data":{"datavalues":["5a54d46b6534d01b4b00247f"],"datakeys":["GLOBAL__BTN_SAVE"]},"languages":["en"]}]}
// .then(projects => res.format({
//   json: function(){
//     res.send({ message: 'hey' });
//   }
// }))