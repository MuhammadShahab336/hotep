import { useSession } from 'next-auth/react';
import {useRouter} from "next/router";

const withAuth = (WrappedComponent) => {
    const WithAuth = (props) => {
        const router = useRouter();
        const { data: session, status } = useSession();
        // Get the user session
        if (status === 'loading') {
            return <p>Loading...</p>;
        }

        if (status !== 'authenticated' || !session) {
            router.push('/auth/signin');
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuth;
};

export default withAuth;