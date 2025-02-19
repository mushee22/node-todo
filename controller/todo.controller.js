import prisma from '../config/client.js';

export const getAllTodos = async (req, res) => {
    try {
        const user = req.user;
        const todos = await prisma.todo.findMany({
            where: {
                userId: user.id
            }
        });
        res.send({
            message: "Success",
            data: todos
        }).status(200);
    } catch (error) {
        next(error);
    }
};

export const getTodoById = async (req, res) => {
    try {
        
        const user = req.user;

        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(req.params.id),
                userId: user.id
            },
            include: {
                users: true
            }
        });
        res.send({
            message: "Success",
            data: todo
        }).status(200);
    } catch (error) {
        res.send({
            message: "Error",
            error: error.message
        }).status(500);
    }
};

export const createTodo = async (req, res) => {
    try {
        const user = req.user;

        const { title, content } = req.body;

        const todo = await prisma.todo.create({
            data: {
                title,
                content,
                userId: user.id
            }
        })
        res.send({
            message: "Created successfully",
            data: todo
        }).status(201);

    } catch (error) {
        res.send({
            message: "Error",
            error: error.message
        }).status(500);
    }

};

export const updateTodo = async (req, res) => {
    try {
        
        const { title, content, is_completed } = req.body;

        const todo = await prisma.todo.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title,
                content,
                isCompleted: is_completed == 1
            }
        })
        
        res.send({
            message: "Updated successfully",
            data: todo
        }).status(201);

    } catch (error) {
        res.send({
            message: "Error",
            error: error.message
        }).status(500);
    }

};

export const deleteTodo = async (req, res) => {
    try {
        
        const user = req.user;
        
        const todo = await prisma.todo.delete({
            where: {
                id: parseInt(req.params.id),
                userId: user.id
            }
        });
        
        res.send({
            title: 'Deleted successfully',
            data: todo
        }).status(200);

    } catch (error) {
        next(error);
    }

};







