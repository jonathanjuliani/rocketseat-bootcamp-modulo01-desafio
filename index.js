const express = require("express");
const server = express();
const {
  idExists,
  allowToInclude,
  counterMiddleware
} = require("./middlewares/middlewares");

let projects = [];

/*
 * Middlewares
 */
server.use(express.json());
server.use(counterMiddleware);

function repassProjectsToMiddleware(req, res, next, middleware) {
  req.projects = projects;
  return middleware(req, res, next);
}

/*
 * CRUD - HTTP Handlers
 */

//get/list all projects
server.get("/projects", (req, res) => {
  res.json(projects);
});

//get/list specific project
server.get(
  "/projects/:id",
  (req, res, next) => repassProjectsToMiddleware(req, res, next, idExists),
  (req, res) => {
    const { id } = req.params;
    const project = projects.find(item => item.id === parseInt(id));
    res.json(project);
  }
);

//create new project
server.post(
  "/projects",
  (req, res, next) =>
    repassProjectsToMiddleware(req, res, next, allowToInclude),
  (req, res) => {
    const project = req.body;
    projects.push(project);
    res.status(201).json(projects);
  }
);

//create a task on given project
server.post(
  "/projects/:id/tasks",
  (req, res, next) => repassProjectsToMiddleware(req, res, next, idExists),
  (req, res) => {
    const task = req.body;
    const { id } = req.params;
    const project = projects.find(item => item.id === parseInt(id));

    if (!project.tasks) {
      project.tasks = [];
      project.tasks.push(task);
    } else {
      project.tasks.push(task);
    }

    res.status(201).json(project);
  }
);

//update a project
server.put(
  "/projects/:id",
  (req, res, next) => repassProjectsToMiddleware(req, res, next, idExists),
  (req, res) => {
    const { title } = req.body;
    const { id } = req.params;
    const project = projects.find(item => item.id === parseInt(id));
    project.title = title;
    res.status(201).json(project);
  }
);

//delete a project
server.delete(
  "/projects/:id",
  (req, res, next) => repassProjectsToMiddleware(req, res, next, idExists),
  (req, res) => {
    const { id } = req.params;
    const filter = projects.filter(item => item.id !== parseInt(id));
    console.log(id, filter);
    projects = filter;

    res.status(200).json(projects);
  }
);

server.listen(3000);
