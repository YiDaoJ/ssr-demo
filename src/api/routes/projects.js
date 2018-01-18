import express from 'express';
import projectsModel from '../models/projects';
import keyModel from '../models/datakeys'
import valueModel from '../models/datavalues'

const router = express.Router()

const formatProject = data => {
  const format = proj => {

    const formatProject = {}

    formatProject._id = proj._id;
    formatProject.data = proj.datavalues;
    formatProject.languages = proj.languages;

    return formatProject
  }

  if(Array.isArray(data)) {
    return data.map(format)
  }

  return format(data)
}

// read
router.get('/', (req, res) => {

  projectsModel
    .find()
    .populate('languages', '_id')
    .populate('datavalues', ['value', 'key', 'language'])
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
  const { _id, languages, ...data } = req.body

  projectsModel
  .findById(_id)
  .populate('datakeys')
  .populate('datavalues', ['value', 'language', 'key'])
  .exec((err, project) => {
    if (err) {
      res.status(400).json(err)
      return
    }

    let keyIsSaved = false
    let valueIsSaved = false

    for(let i = 0; i  < project.datakeys.length; i++) {
      if(project.datakeys[i].value === data.key) {
        keyIsSaved = true
        break
      }
    }

    /* =============== datakey =============  */

    if(!keyIsSaved) {
      const key = new keyModel({ value: data.key })
      project.datakeys.push(key)
      key.save()
    } else {
      const keyIndex = project.datakeys.findIndex(key => key.value === data.key)
      console.log(project.datakeys[keyIndex])
      project.datakeys[keyIndex].update({
        value: data.value
      })
    }

    for(let i = 0; i < project.datavalues.length; i++) {
      if(project.datavalues[i].key === data.key) {
        valueIsSaved = true
        break
      }
    }

    /* =============== datavalue =============  */

    if(!valueIsSaved) {
      const value = new valueModel({
        value: data.value,
        language: data.language,
        project: data.project,
        key: data.key
      })

      project.datavalues.push(value)

      value.save()
      project.save()
      res.json(formatProject(project))
    } else {
      const currentValue = project.datavalues.find(key => key.key === data.key)

      const newData = {
        value: data.value,
        language: data.language,
        project: data.project,
        key: data.key
      }

      if(currentValue) {
        valueModel.findOneAndUpdate({ _id: currentValue._id },{ $set: newData } , {new: true}, () => {
          const index = project.datavalues.findIndex(key => key.key === data.key)
          project.datavalues[index] = {
            _id: currentValue._id,
            ...newData
          }
          project.save()
          res.json(formatProject(project))
        })
      }

    }
  })

  // projectsModel
  //   .findOneAndUpdate({_id: req.body._id}, { $set: data }, {new: true})
  //   // .findByIdAndUpdate(req.query._id, projectsModel.updateProject, {new: true})
  //   // .exec((err, project) => {
  //   //   if (err) return
  //   //   console.log(err);

  //   //   // console.log(project)
  //   //   res.json(project)
  //   // })
  //   .then(project=> res.json(project))
  //   .catch(err => res.status(400).json(err));
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