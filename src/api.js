import axios from 'axios'

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user)
  },
  project: {
    get: () =>
      axios.get("/api/projects").then(res => res.data),
    post: project =>
      axios.post("/api/projects", project).then(res => res.data)
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
