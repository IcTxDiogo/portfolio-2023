import { useEffect, useState } from "react";

import { CommandDialog, CommandInput } from "@/components/ui/command";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import ShowFindDialogList from "@/components/project/pokebro-map/showFindDialogList";

type ShowFindDialogProps = {
    handleSelectMarker: (marker: MapMarkers[number]) => void;
};

export default function ShowFindDialog({ handleSelectMarker }: ShowFindDialogProps) {
    const [findDialog, setFindDialog] = useState(false);
    const [dialogSearchValue, setDialogSearchValue] = useState("");

    useEffect(() => {
        function down(e: KeyboardEvent) {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setFindDialog((open) => !open);
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
