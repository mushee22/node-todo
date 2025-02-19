import prisma from "../config/client.js";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userAlreadyExist = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (userAlreadyExist) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        await prisma.$transaction(async (tx) => {

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user,
                token
            });
        })

    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);


        if (!isPasswordCorrect) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: user,
            token
        });


    } catch (error) {
        next(error)
    }
};

export const signOut = async (req, res) => {
    res.send({
        title: 'Sign Up',
    });
};

