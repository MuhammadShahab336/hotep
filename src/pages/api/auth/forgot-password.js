import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import {sendResetEmail} from "@/lib/email";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(422).json({msg: "Please fill all the fields"});
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return res.status(422).json({msg: "User not found"});
        }

        try {
            const msg = await requestResetPassword(email);

            return res.status(200).json({
                msg,
                email
            });

        } catch (e) {
            return res.status(500).json({msg: "Something went wrong"});
        }

    } else {
        return res.status(405).json({msg: 'Method not allowed'});
    }
}

async function requestResetPassword(userEmail) {
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    // reset token
    const resetToken = uuidv4()

    const update =  await prisma.user.update({
        where: {
            email: userEmail,
        },
        data: {
            reset_token: resetToken,
        }
    })
    await sendResetEmail(userEmail, resetToken);

    return 'Password reset email send'

}