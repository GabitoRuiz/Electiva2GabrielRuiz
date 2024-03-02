const { Router } = require("express");
const { body } = require('express-validator');
const {
  listTasks,
  tasksById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = Router();

//Ruta para obtener todas las tareas
router.get("/tasks", listTasks);

//Ruta para obtener tarea por su id
router.get("/tasks/:id", tasksById);

//Ruta para crear nueva tarea
router.post(
  "/tasks",
  [
    body("title").notEmpty().withMessage("El titulo no puede estar vacio"),
    body("description")
      .notEmpty()
      .withMessage("La descripcion no puede estar vacia"),
    body("creationHour")
      .notEmpty()
      .withMessage("La hora de creacion no puede estar vacia"),
    body("state").notEmpty().withMessage("La tarea debe tener un estado"),
  ],
  createTask
);
//Ruta para actualizar tarea existente
router.put(
  "/tasks/:id",
  [
    body("title").notEmpty().withMessage("El titulo no puede estar vacio"),
    body("description")
      .notEmpty()
      .withMessage("La descripcion no puede estar vacia"),
    body("creationHour")
      .notEmpty()
      .withMessage("La hora de creacion no puede estar vacia"),
    body("state").notEmpty().withMessage("La tarea debe tener un estado"),
  ],
  updateTask
);

//Ruta para eliminar tarea existente
router.delete("/tasks/:id", deleteTask);
module.exports = router;