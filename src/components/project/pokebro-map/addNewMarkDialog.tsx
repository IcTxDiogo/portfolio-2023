import { type ReactNode, useState } from "react";
import { z } from "zod";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import AddNewMarkDialogForm from "@/components/project/pokebro-map/addNewMarkDialogForm";

type addNewMarkDialogProps = {
    children: ReactNode;
    getMousePosition: (e: MouseEvent) => { x: number; y: number; floor: number };
};

export default function AddNewMarkDialog({ children, getMousePosition }: addNewMarkDialogProps) {
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0, floor: 0 });

    function handleMarkClick(e: MouseEvent) {
        const { x, y, floor } = getMousePosition(e);
        setClickPosition({ x, y, floor });
    }

    return (
        <>
            <Dialog>
                <ContextMenu>
                    <ContextMenuTrigger onContextMenu={(e) => handleMarkClick(e.nativeEvent)}>
                        {children}
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <DialogTrigger asChild>
                            <ContextMenuItem>New mark here</ContextMenuItem>
                        </DialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <DialogContent
                    className="sm:max-w-[425px]"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <DialogHeader>
                        <DialogTitle>New marker</DialogTitle>
                    </DialogHeader>
                    <AddNewMarkDialogForm clickPosition={clickPosition} />
                </DialogContent>
            </Dialog>
        </>
    );
}
