import { ArrowDown, ArrowUp } from "lucide-react";
import { type ReactNode } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

type MenuNavigationProps = {
    floor: number;
    setFloor: (floor: number) => void;
    children?: ReactNode;
};

type MapNavigationItem = {
    content: ReactNode;
    parameter: "up" | "down" | "7";
};

export default function MenuNavigation({ floor, setFloor, children }: MenuNavigationProps) {
    function controlFloor(action: "up" | "down" | "7") {
        if (action === "up") {
            if (floor < 15) {
                setFloor(floor + 1);
            }
        } else if (action === "down") {
            if (floor > 0) {
                setFloor(floor - 1);
            }
        } else {
            setFloor(7);
        }
    }

    const mapNavigationItem: MapNavigationItem[] = [
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
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList
                className={"flex max-w-fit flex-col items-center justify-center gap-2 space-x-0"}
            >
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
    );
}
