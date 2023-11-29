import { useEffect, useState } from "react";

import ShowFindDialogList from "@/components/project/pokebro-map/showFindDialogList";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import { CommandDialog, CommandInput } from "@/components/ui/command";

type ShowFindDialogProps = {
    handleSelectMarker: (marker: MapMarkers[number]) => void;
    findDialog: boolean;
    setFindDialog: (open: boolean) => void;
};

export default function ShowFindDialog({
    handleSelectMarker,
    findDialog,
    setFindDialog,
}: ShowFindDialogProps) {
    const [dialogSearchValue, setDialogSearchValue] = useState("");

    useEffect(() => {
        function down(e: KeyboardEvent) {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setFindDialog(!open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <div onWheel={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            <CommandDialog open={findDialog} onOpenChange={setFindDialog} shouldFilter={false}>
                <CommandInput
                    placeholder="Type a search..."
                    value={dialogSearchValue}
                    onValueChange={setDialogSearchValue}
                />
                <ShowFindDialogList
                    dialogSearchValue={dialogSearchValue}
                    handleSelectMarker={handleSelectMarker}
                    setFindDialog={setFindDialog}
                />
            </CommandDialog>
        </div>
    );
}
