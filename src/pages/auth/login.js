import {Button, Card, CardBody, Input} from "@nextui-org/react";
import InputPassword from "@/components/InputPassword";

export default function Login() {
    return (
        <>
            <div className="h-dvh w-100 flex items-center justify-center">
                <Card className="w-[500px]">
                    <CardBody className="p-8">
                        <h1 className="text-center text-3xl mb-4 font-semibold">Login</h1>
                        <div className="flex flex-col gap-5">
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

                            <Button color="primary" className="shadow-2xl mt-5 font-medium">
                                Login
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}