import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default withAuth(function Home() {
    return (
        <>
            <Layout />
        </>
    );
})
