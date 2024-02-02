import {Button, Card, CardBody, Input} from "@nextui-org/react";
import InputPassword from "@/components/InputPassword";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

export default function SignIn() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signIn( 'credentials', {
            redirect: false,
            email: 'shahab@yopmail.com',
            password: '123456789',
        });

        if(res) {
            router.push('/')
        }
    }

    return (
        <>
            <div className="h-dvh w-100 flex items-center justify-center">
                <Card className="w-[500px]">
                    <CardBody className="p-8">
                        <h1 className="text-center text-3xl mb-4 font-semibold">Login</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <Input
                                type="email"
                                label="Email"
                                variant="bordered"
                                placeholder="Enter your email"
                            />

                            <InputPassword
                                label="Password"
                                // variant="faded"
                                placeholder="Enter your password"
                            />

                            <Button
                                type="submit"
                                color="primary"
                                className="shadow-2xl mt-5 font-medium">
                                Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}