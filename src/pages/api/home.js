import {authenticate} from "@/lib/auth"


const handler = (req, res) => {
    if(req.method === 'Get'){
        const user = req.user;
        res.status(200).json({ message: 'Access granted', user });
    } else {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
}

export default authenticate(handler);