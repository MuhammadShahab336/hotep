import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { first_name, last_name, email, password } = req.body;

        if(!first_name || !last_name || !email || !password) {
            return res.status(422).json({error: "Please fill all the fields"});
        }

        try {
            const hashPassword = await bcrypt.hash(password, 10)
            const createUser = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    password: hashPassword,
                },
            });
            return res.status(200).json({data: createUser});
        } catch (e) {
            return res.status(500).json({error: "Something went wrong"});
        }

    } else {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
}