import { type ReactNode } from "react";
import NavBar, { type MenuItem } from "@/components/layout/navBar";

type LayoutProps = {
    children: ReactNode;
};

const menuItem: MenuItem[] = [];

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}
