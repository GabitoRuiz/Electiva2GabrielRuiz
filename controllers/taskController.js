const { response } = require("express");
const { validationResult } = require('express-validator');

const tasks = [];

//Obtener todas las tareas
const listTasks = (req, res = response) => {
  res.statusCode = 200;
  res.json(tasks);
};

//Obtener tareas por su id
const tasksById = (req, res = response) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json("404 Task not found");
  }
  res.json(task);
};

//Crear una nueva tarea
const createTask = (req, res = response) => {
  //Validacion para revisar el contenido del json
  if (!req.body) {
    return res.status(400).json({ message: "Cuerpo de la solicitud vacío" });
  }

  // Validar los campos de la tarea utilizando express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, creationHour, state } = req.body;
  const taskId = tasks.length + 1;
  const newTask = { id: taskId, title, description, creationHour, state };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

//Actualizar tarea existente
const updateTask = (req, res = response) => {
  // Validar los campos de la tarea utilizando express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const taskId = parseInt(req.params.id);
  const { title, description, creationHour, state } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  tasks[taskIndex] = { id: taskId, title, description, creationHour, state };
  res.json(tasks[taskIndex]);
};

//Eliminar tarea existente
const deleteTask = (req, res = response) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  tasks.splice(taskIndex, 1);
  res.json({ message: "Tarea eliminada correctamente" });
};

module.exports = {
  listTasks,
  tasksById,
  createTask,
  updateTask,
  deleteTask,
};
