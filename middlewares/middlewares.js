let counter = 0;

exports.idExists = (req, res, next) => {
  const { projects } = req;
  const { id } = req.params;

  //caso encontre o item na lista prossegue com a request
  if (findProject(projects, id)) {
    return next();
  }

  //caso não encontre retorna já que o item não existe
  return res
    .status(400)
    .json({ error: `O projeto com id: ${id} não foi encontrado.` });
};

exports.allowToInclude = (req, res, next) => {
  const { projects } = req;
  const { id } = req.body;

  //caso encontre o item na lista prossegue com a request
  if (findProject(projects, id)) {
    return res
      .status(403)
      .json({ error: `O projeto com id: ${id} já existe.` });
  }

  return next();
};

exports.counterMiddleware = ({ next }) => {
  counter++;
  console.log(`Total requests: ${counter}`);
  next();
};

function findProject(projectsList, projectId) {
  const id = parseInt(projectId);
  return projectsList.find(item => item.id === id);
}
