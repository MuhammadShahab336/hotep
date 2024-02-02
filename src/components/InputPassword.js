import {useState} from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@/const/svg";

export default function InputPassword(props)  {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            {...props}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
        />
    )
}