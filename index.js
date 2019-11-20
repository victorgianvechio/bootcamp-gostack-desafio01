const express = require('express')

const server = express()

server.use(express.json())

const projects = []

function checkProjectExists(req, res, next) {

  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();

}

function logRequest(req, res, next) {
  console.count("Número de requisições")
  return next()
}

server.use(logRequest)

server.get('/projects', (req, res) => {
  res.send(projects)
})

server.post('/projects', (req, res) => {

  // const { id, title } = req.body;

  // const project = {
  //   id,
  //   title,
  //   tasks: []
  // };

  const project = {}
  project.id = req.body.id
  project.title = req.body.title
  project.tasks = []  

  projects.push(project)

  return res.json(projects) 

})

server.put('/projects/:id', checkProjectExists, (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);

})

server.delete('/projects/:id', checkProjectExists, (req, res) => {

  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();

})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {

  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)

  project.tasks.push(title)

  return res.json(project)

})

server.listen(3000)  