import express from 'express';
import projectsModel from '../models/projects';
import keyModel from '../models/datakeys'
import valueModel from '../models/datavalues'
import languageModel from '../models/languages'

const router = express.Router()

const formatProject = data => {

  const format = proj => {

    const formatProject = {}

    formatProject._id = proj._id;
    // formatProject.key = proj.datakeys;
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
    .populate('datakeys', 'value')
    .populate('datavalues', ['value', 'key', 'language'])
    .exec((err, data) => {
      console.log('-----data: ', data)
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
      res.json(data)
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
    .exec((error, project) => {
      if(error)
        res.status(400).json(err)

      if(project) {
        project.datavalues.forEach( key => {
          valueModel
            .findByIdAndRemove(key)
            .exec((error, data) => {
              if(error)
                res.status(400).json(error)
              if(key)
                console.log('removed data: ', data)
            })
        })
        res.json(project)
      }
    })
})

function keyUpdate(projectDemo, keyIsSaved, data) {
    // check if datakey is in Project saved
    for(let i = 0; i  < projectDemo.datakeys.length; i++) {
      if(projectDemo.datakeys[i].value === data.key) {
        keyIsSaved = true
        break
      }
    }
    console.log('datakeysaved? ', keyIsSaved)
    if(!keyIsSaved) {
      return keyModel
      .findOne({ value: data.key})
      .exec((error, result)  => {
        if(error)
          res.status(400).json(error)

        if(!result) {     // if this item doesn't exist in db
          const key = new keyModel({ value: data.key })
          key.save()
          projectDemo.datakeys.push(key)
        } else {
          console.log('projectDemo before push: ', projectDemo)
          projectDemo.datakeys.push(result)
          console.log('projectDemo after push: ', projectDemo)
        }
        // projectDemo.save()
      })
    } else {
      return keyModel
      .findOne({ value: data.key})
      .exec((error, result)  => {
        if(error)
          res.status(400).json(error)

        if(result) {
          const keyIndex = projectDemo.datakeys.findIndex(key => key.value === data.key)
          projectDemo.datakeys[keyIndex] = result // ?
        }
      })
    }
}

function valueUpdate(projectDemo,valueIsSaved, data) {
  for(let i = 0; i < projectDemo.datavalues.length; i++) {
    if(projectDemo.datavalues[i].key === data.key) {
      valueIsSaved = true
      break
    }
  }
  console.log('datavalue saved? ', valueIsSaved)
  if(!valueIsSaved) {
    const value = new valueModel({
      value: data.value,
      language: data.language,
      project: data.project,
      key: data.key
    })

    projectDemo.datavalues.push(value)
    value.save()
    projectDemo.save()

  } else {
    const currentValue = projectDemo
                          .datavalues
                          .find(key => key.key === data.key
                            && key.language === data.language
                            && key.project == data.project)
    console.log('currentValue: ', currentValue)
    const newData = {
      value: data.value,
      language: data.language,
      project: data.project,
      key: data.key
    }

    if(currentValue) {
      return valueModel
      .findOneAndUpdate(
        { _id: currentValue._id },
        { $set: newData },
        {new: true},
        (error, newDatavalue) => {
          if(error)
            res.status(400).json(error)

          const index = projectDemo
                          .datavalues
                          .findIndex(key => key.key === data.key)
          projectDemo.datavalues[index] = {
            ...newDatavalue
            // _id: currentValue._id,
            // ...newData
          }
      })
    }
    projectDemo.save()
  }
}

function languageUpdate(projectDemo, languageIsSaved, data) {
  for(let i = 0; i  < projectDemo.languages.length; i++) {
    if(projectDemo.languages[i]._id === data.language) {
      languageIsSaved = true
      break
    }
  }
  console.log('lang is saved: ', languageIsSaved)
  if(!languageIsSaved) {
    return languageModel
    .findOne({ _id: data.language})
    .exec((error, result)  => {
      if(error)
        res.status(400).json(error)

      if( !result) { // if this item doesn't exist in db
        const lang = new languageModel({ _id: data.language })
        projectDemo.languages.push(lang)
        lang.save()
      } else {
        projectDemo.languages.push(result)
        // console.log('after insert lang: ', projectDemo)
      }
      // projectDemo.save()
    })

  } else {
    return languageModel
    .findOne({ _id: data.language})
    .exec((error, result)  => {
      if(error)
        res.status(400).json(error)

      const langIndex = projectDemo.languages.findIndex(lang => lang._id === data.language)
      projectDemo.languages[langIndex]._id = result._id // ?
      // projectDemo.save()
    })
  }
}

// update
router.put('/', (req, res) => {

  const { _id, languages, ...data } = req.body

  projectsModel
  .findById(_id)
  .populate('datakeys')
  .populate('datavalues')
  .populate('languages', '_id')
  .exec((err, project) => {
    if (err) {
      res.status(400).json(err)
      return
    }

    let keyIsSaved = false
    let valueIsSaved = false
    let languageIsSaved = false

    const projectDemo = project
    console.log('initial projectDemo: ', projectDemo)

    keyUpdate(projectDemo, keyIsSaved, data)
      .then(() => {
        languageUpdate(projectDemo, languageIsSaved, data)
        .then(() => {
          valueUpdate(projectDemo, valueIsSaved, data)
          console.log('last check: ', projectDemo)
          res.json(formatProject(projectDemo))
        })
      })

  })
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