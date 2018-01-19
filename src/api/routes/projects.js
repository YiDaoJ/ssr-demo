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
    let languageIsSaved = false


    /* =============== datakey =============  */

    // check if datakey is in Project saved
    for(let i = 0; i  < project.datakeys.length; i++) {
      if(project.datakeys[i].value === data.key) {
        keyIsSaved = true
        break
      }
    }

    const projectDemo = project

    if( !keyIsSaved) {
      keyModel
      .findOne({ value: data.key})
      .then( result  => {

        if( !result) { // if this item doesn't exist in db
          console.log('not in db saved')
          // create item in DB
          const key = new keyModel({ value: data.key })
          projectDemo.datakeys.push(key)
          console.log('projectDemo1: ', projectDemo)
          key.save()

        }
        // else {
          console.log('exist')

          // if(!keyIsSaved) {
            console.log('result datakeys: ', projectDemo.datakey)
            const key = projectDemo.datakeys.find(datakey => datakey.value === data.key)
            // projectDemo.datakeys._id = key._id
            projectDemo.datakeys.push(key)

          // } else {

            // const keyIndex = projectDemo.datakeys.findIndex(key => key.value === data.key)
            // projectDemo.datakeys[keyIndex].update({
            //   value: data.value
            // })
          // }
        // }

        // projectDemo.save()
        console.log('projectDemo for key: ', projectDemo)

      })

    } else {
      const keyIndex = projectDemo.datakeys.findIndex(key => key.value === data.key)
      projectDemo.datakeys[keyIndex].update({
        value: data.value
      })
      // projectDemo.save()
        console.log('projectDemo for key: ', projectDemo)

    }




    /* =============== language =============  */

    for(let i = 0; i  < project.languages.length; i++) {
      if(project.languages[i]._id === data.language) {
        languageIsSaved = true
        break
      }
    }

    if(!languageIsSaved) {
      languageModel
      .findOne({ _id: data.language})
      .then( result  => {
        if( !result) { // if this item doesn't exist in db
          console.log('language not in db saved')
          // create item in DB
          const lang = new languageModel({ _id: data.language })
          projectDemo.languages.push(lang)
          lang.save()
        }
        // else {
          console.log('language exist')
          // if(!languageIsSaved) {
            // console.log('result language: ', projectDemo.languages)
            const language = projectDemo.languages.find(lang => lang._id === data.language)
            // projectDemo.datakeys._id = key._id
            projectDemo.languages.push(language)

          // }
        //   else {
        //     const langIndex = projectDemo.languages.findIndex(lang => lang._id === data.language)
        //     projectDemo.languages[langIndex].update({
        //       _id: data.language
        //     })
        //   }
        // }

        projectDemo.save()
        console.log('projectDemo: ', projectDemo)


      })

    } else {
      const langIndex = projectDemo.languages.findIndex(lang => lang._id === data.language)
      projectDemo.languages[langIndex].update({
        _id: data.language
      })
      projectDemo.save()
    }

    res.json(formatProject(projectDemo))


      // .then(result => {
      //   console.log('language result: ', result)
      //   result ? languageIsInDBSaved = true : languageIsInDBSaved = false
      //   console.log(languageIsInDBSaved)
      //   if(!languageIsSaved ) {
      //     const lang = new languageModel({ _id: data.language })
      //     projectDemo.languages.push(lang)
      //     lang.save()
      //   } else {
      //     const langIndex = projectDemo.languages.findIndex(lang => lang._id === data.language)
      //     projectDemo.languages[langIndex].update({
      //       _id: data.language
      //     })
      //   }

      // })



    /* =============== datavalue =============  */

    // for(let i = 0; i < projectDemo.datavalues.length; i++) {
    //   if(projectDemo.datavalues[i].key === data.key) {
    //     valueIsSaved = true
    //     break
    //   }
    // }

    // if(!valueIsSaved) {
    //   const value = new valueModel({
    //     value: data.value,
    //     language: data.language,
    //     project: data.project,
    //     key: data.key
    //   })

    //   projectDemo.datavalues.push(value)

    //   value.save()
    //   projectDemo.save()
    //   res.json(formatProject(projectDemo))
    // } else {
    //   const currentValue = projectDemo.datavalues.find(key => key.key === data.key)

    //   const newData = {
    //     value: data.value,
    //     language: data.language,
    //     project: data.project,
    //     key: data.key
    //   }

    //   if(currentValue) {
    //     valueModel.findOneAndUpdate({ _id: currentValue._id },{ $set: newData } , {new: true}, () => {
    //       const index = projectDemo.datavalues.findIndex(key => key.key === data.key)
    //       projectDemo.datavalues[index] = {
    //         _id: currentValue._id,
    //         ...newData
    //       }
    //       projectDemo.save()
    //       console.log('project: ', project)
    //       console.log('projectDemo: ', projectDemo)
    //       res.json(formatProject(projectDemo))
    //     })
    //   }
    // }




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