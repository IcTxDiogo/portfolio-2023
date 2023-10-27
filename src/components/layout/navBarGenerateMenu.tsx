"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type MenuItem } from "@/components/layout/navBar";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavBarGenerateMenuProps = {
    items: MenuItem[];
};

export default function NavBarGenerateMenu({ items }: NavBarGenerateMenuProps) {
    const pathname = usePathname();
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map((item) => (
                    <NavigationMenuItem
                        key={item.id}
                        className={pathname === item.href ? "border-b border-foreground" : ""}
                    >
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {item.name}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
