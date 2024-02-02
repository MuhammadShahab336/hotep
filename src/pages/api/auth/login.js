import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {generateToken} from "@/lib/auth";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(422).json({error: "Please fill all the fields"});
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if(!user){
            return res.status(422).json({error: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword){
            return res.status(422).json({error: "Invalid credentials"});
        }

        try {
            const token = generateToken({userId: user.id, email: user.email})
            delete user.password;
            res.status(200).json({data: { user, token}});
        } catch (e) {
            res.status(500).json({error: "Something went wrong"});
        }
    } else {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
}