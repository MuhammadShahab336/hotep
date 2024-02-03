import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import {AcmeLogo} from "@/const/svg";



export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(true);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const Nav = (props) => {
        return (
            <ul className={`p-1 mt-4 flex flex-col  ${isMenuOpen ? '' : 'items-center'}`}>
                {props.children}
            </ul>
        )
    }

    const NavItem = (props) => {
        return (
            <li className="text-[#ddd] py-2 px-3 rounded-xl duration-250 hover:bg-primary-500 hover:shadow cursor-pointer" {...props}>
                {props.children}
            </li>
        )
    }

    return (
        <>
            <div className="flex">
                <div className={`bg-[#333] h-screen p-3 relative duration-300 overflow-auto ${isMenuOpen ? ' w-72' : 'w-20'}`}>
                    <div
                        class="w-[20px] h-[20px] rounded-[200px] border border-[#333] bg-white absolute -right-2 top-2 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    <Nav>
                        {menuItems?.map((item) => (
                            <NavItem key={item}>
                                {isMenuOpen ? item : item[0]}
                            </NavItem>
                        ))}
                    </Nav>
                    <ul className={`p-1 mt-4 flex flex-col  ${isMenuOpen ? '' : 'items-center'}`}>
                        {menuItems?.map((item) => (
                            <li key={item} className="text-[#ddd] py-2 px-3 rounded-xl duration-250 hover:bg-primary-500 hover:shadow cursor-pointer">
                                {isMenuOpen ? item : item[0]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
