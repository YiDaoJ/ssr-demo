import axios from 'axios'

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", credentials).then(res => { console.log('res.data: ', res); return res.data } )
      // res.data: {email: "test@test.com"}
  },
  project: {
    get: () =>
      axios.get("/api/projects").then(res => res.data),

    post: project =>
      axios.post("/api/projects", project).then(res => res.data),

    delete: project =>
      axios.delete("/api/projects", { params: {_id: project.project._id} }).then(res => res.data),
    // res.data: [{_id: "HennesProject2", __v: 0, data: {…}, languages: Array(0)}]

    put: data =>
      axios.put("/api/projects", {_id: data.project._id}, data.payload).then(res => res.data)
      //{_id: "HennesProject2", __v: 0, data: {{datavalues: Array(0), datakeys: Array(0)}}, languages: Array(0)}
  }
}




/*
  in router:
  then(projects => res.send(projects));
  api:
  then(res => res.data)

  in router
  then(projects => res.json({projects}))
  api:
  then(res => res.data.projects)

*/
