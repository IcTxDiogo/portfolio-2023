import { ArrowLeft } from "lucide-react";
import { type ReactNode } from "react";
import Link from "next/link";

import NavBarGenerateMenu from "@/components/layout/navBarGenerateMenu";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/themeToggle";
import { Button } from "@/components/ui/button";

export type MenuItem = {
    id: string;
    name: string;
    href: string;
};

type NavBarProps = {
    leftItem: ReactNode;
    items: MenuItem[];
    isHome?: boolean;
};

export default function NavBar({ leftItem, items, isHome }: NavBarProps) {
    return (
        <nav
            className={
                "sticky top-0 flex h-[7vh] items-center justify-between border-b border-b-foreground bg-background px-8"
            }
        >
            <div className={"flex items-center gap-2"}>
                {!isHome && (
                    <Link href={"/projects"}>
                        <Button variant={"ghost"} size={"icon"}>
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                )}
                {leftItem}
            </div>
            <div className={"flex gap-2"}>
                <NavBarGenerateMenu items={items} />
                <Separator orientation={"vertical"} className={"h-[40px]"} />
                <ThemeToggle />
            </div>
        </nav>
    );
}
