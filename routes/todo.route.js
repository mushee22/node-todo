import { Router } from "express";

import {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from "../controller/todo.controller.js";

const todoRouter = Router();

todoRouter.get('/', getAllTodos);

todoRouter.get('/:id', getTodoById);

todoRouter.post('/', createTodo);

todoRouter.put('/:id', updateTodo);

todoRouter.delete('/:id', deleteTodo);

export default todoRouter;