import { type ReactNode } from "react";

import ThemeToggle from "@/components/themeToggle";
import { Separator } from "@/components/ui/separator";
import NavBarGenerateMenu from "@/components/layout/navBarGenerateMenu";

export type MenuItem = {
    id: string;
    name: string;
    href: string;
};

type NavBarProps = {
    leftItem: ReactNode;
    items: MenuItem[];
};

export default function NavBar({ leftItem, items }: NavBarProps) {
    return (
        <nav
            className={
                "sticky top-0 flex h-[7vh] items-center justify-between border-b border-b-foreground bg-background px-8"
            }
        >
            {leftItem}
            <div className={"flex gap-2"}>
                <NavBarGenerateMenu items={items} />
                <Separator orientation={"vertical"} className={"h-[40px]"} />
                <ThemeToggle />
            </div>
        </nav>
    );
}
