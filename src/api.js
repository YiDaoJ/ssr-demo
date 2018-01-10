import axios from 'axios'

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user)
  },
  project: {
    getProjects: projects =>
      axios.get("/api/projects", {projects}).then(res => res.data.projects )

  }
}