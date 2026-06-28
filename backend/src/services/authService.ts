import prisma from "../config/db";
import {
  hashPassword,
  comparePassword,
} from "../utils/password";
import bcrypt from "bcryptjs";
import {Role}   from "@prisma/client";
import { generateToken, setAuthCookie } from "../utils/jwt";
import { Response } from "express";

export const register = async (data: {
    name: string;
    email: string;
    password: string;
    departmentId: string;
}) => {
    //check user if exits
    const userExits = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });

    if (userExits) {
        throw new Error("User already exists");
    }

    //hash password
    const hashedPass = await bcrypt.hash(data.password, 10);

    //create user
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPass,
            role: Role.CLAIMANT,
            departmentId: data.departmentId,
        },
        select: {
            userId: true,
            name: true,
            email: true,
            role: true,
            departmentId: true,
        }
    });

    return user;
};

export const login = async (data: {
    email: string;
    password: string;
}, res: Response) => {
    //check user if exits
    const userExits = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });
    if (!userExits) {
        throw new Error("Invalid email or password");
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(data.password, userExits.password);
    if (!isPasswordValid) {
        throw new Error("Wrong password");
    }

    const token = generateToken(userExits.userId, userExits.role);
    setAuthCookie(res, token);
    return {
        token,
        user: {
            userId: userExits.userId,
            name: userExits.name,
            email: userExits.email,
            role: userExits.role,
            avatar: userExits.avatar,
            departmentId: userExits.departmentId,
        }
    };
};

export const getProfile = async (
    userId: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            userId
        },
        select:{
            userId: true,
            name: true,
            email: true,
            //password: true,
            avatar: true,
            role: true,
            department: {
                select: {
                    departmentId: true,
                    name: true
                }
            }
        }
    });

    if (!user) {
        throw new Error("User not found");
    }
    return user;
}