import { ArrowDown, ArrowUp, Home, Minus, Plus } from "lucide-react";
import { type ReactNode } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type MenuNavigationProps = {
    floor: number;
    setFloor: (floor: number) => void;
    doZoom: (zoomIn: boolean) => void;
    children?: ReactNode;
};

type Action = "up" | "down" | "7" | "in" | "out";

type MapNavigationItem = {
    content: ReactNode;
    parameter: Action;
};

type MapLinkItem = {
    content: ReactNode;
    href: string;
};

export default function MenuNavigation({ floor, setFloor, doZoom, children }: MenuNavigationProps) {
    function controlFloor(action: Action) {
        if (action === "up") {
            if (floor < 15) {
                setFloor(floor + 1);
            }
        } else if (action === "down") {
            if (floor > 0) {
                setFloor(floor - 1);
            }
        } else if (action === "in") {
            console.log("in");
            doZoom(true);
        } else if (action === "out") {
            console.log("out");
            doZoom(false);
        } else {
            setFloor(7);
        }
    }

    const mapNavigationItem: MapNavigationItem[] = [
        {
            content: <Plus />,
            parameter: "in",
        },
        {
            content: <ArrowUp />,
            parameter: "up",
        },
        {
            content: floor,
            parameter: "7",
        },
        {
            content: <ArrowDown />,
            parameter: "down",
        },
        {
            content: <Minus />,
            parameter: "out",
        },
    ];

    const mapLinkItem: MapLinkItem[] = [
        {
            content: <Home />,
            href: "/projects",
        },
    ];

    return (
        <div
            className={
                "absolute inset-y-0 right-[20px] z-50 flex flex-col items-center justify-center gap-2 "
            }
        >
            <NavigationMenu>
                <NavigationMenuList
                    className={
                        "flex max-w-fit flex-col items-center justify-center gap-2 space-x-0"
                    }
                >
                    {mapLinkItem.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <Link href={item.href}>
                                <Button variant={"outline"} size={"icon"}>
                                    {item.content}
                                </Button>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                    {mapNavigationItem.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => controlFloor(item.parameter)}
                            >
                                {item.content}
                            </Button>
                        </NavigationMenuItem>
                    ))}
                    {children}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
