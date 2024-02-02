import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const user = await prisma.user.findMany();

        res.status(200).json({ message: 'Access granted', user });

    } else {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
}