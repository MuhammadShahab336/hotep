import prisma  from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { resetToken } = req.query;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ msg: "Please fill all the fields" });
        }

        try {
            const msg = await resetPassword(resetToken, email, password);
            res.status(200).json({ msg });

        } catch (e) {
            return res.status(500).json({ msg: 'Something went wrong' });
        }

    } else {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
}

async function resetPassword(resetToken, userEmail, newPassword) {
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    });

    if(!user || user.reset_token !== resetToken){
        return 'Invalid token';
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashPassword,
            reset_token: null,
        },
    })

    return 'password reset successfully';
}