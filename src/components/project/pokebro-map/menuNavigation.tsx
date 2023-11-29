import { ArrowDown, ArrowUp, Home, Keyboard, Minus, Plus } from "lucide-react";
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
    setFindDialog: (open: boolean) => void;
    topItems?: ReactNode;
    bottomItems?: ReactNode;
};

type Action = "up" | "down" | "7" | "in" | "out" | "search";

type MapNavigationItem = {
    content: ReactNode;
    parameter: Action;
    name: string;
};

type MapLinkItem = {
    content: ReactNode;
    href: string;
    name: string;
};

export default function MenuNavigation({
    floor,
    setFloor,
    doZoom,
    setFindDialog,
    topItems,
    bottomItems,
}: MenuNavigationProps) {
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
            doZoom(true);
        } else if (action === "out") {
            doZoom(false);
        } else if (action === "search") {
            setFindDialog(true);
        } else {
            setFloor(7);
        }
    }

    const CenterMapNavigationItems: MapNavigationItem[] = [
        {
            content: <Plus />,
            parameter: "in",
            name: "Zoom in",
        },
        {
            content: <ArrowUp />,
            parameter: "up",
            name: "Up floor",
        },
        {
            content: floor,
            parameter: "7",
            name: `Actual floor ${floor}`,
        },
        {
            content: <ArrowDown />,
            parameter: "down",
            name: "Down floor",
        },
        {
            content: <Minus />,
            parameter: "out",
            name: "Zoom out",
        },
        {
            content: <Keyboard />,
            parameter: "search",
            name: "Search",
        },
    ];

    const mapLinkItem: MapLinkItem[] = [
        {
            content: <Home />,
            href: "/projects",
            name: "Back to projects",
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
                                <Button variant={"outline"} size={"icon"} aria-label={item.name}>
                                    {item.content}
                                </Button>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                    {topItems}
                    {CenterMapNavigationItems.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            <Button
                                variant={"outline"}
                                size={"icon"}
                                onClick={() => controlFloor(item.parameter)}
                                aria-label={item.name}
                            >
                                {item.content}
                            </Button>
                        </NavigationMenuItem>
                    ))}
                    {bottomItems}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
