import { type ReactNode } from "react";
import NavBar, { type MenuItem } from "@/components/layout/navBar";
import { randomUUID } from "crypto";
import Footer from "@/components/layout/footer";

type LayoutProps = {
    children: ReactNode;
};

const menuItem: MenuItem[] = [
    {
        id: randomUUID(),
        name: "Home",
        href: "/",
    },
    {
        id: randomUUID(),
        name: "About",
        href: "/about",
    },
    {
        id: randomUUID(),
        name: "Projects",
        href: "/projects",
    },
    {
        id: randomUUID(),
        name: "Example Page",
        href: "/example-page",
    },
];

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <NavBar isHome leftItem={"Portfolio"} items={menuItem} />
            {children}
            <Footer />
        </>
    );
}
