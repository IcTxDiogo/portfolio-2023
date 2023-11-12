import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import { Building } from "lucide-react";

type ShowFindDialogProps = {
    cityMarks: MapMarkers;
    handleSelectMarker: (x: number, y: number, floor: number) => void;
};

export default function ShowFindDialog({ cityMarks, handleSelectMarker }: ShowFindDialogProps) {
    const [findDialog, setFindDialog] = useState(false);

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
        <div onWheel={(e) => e.stopPropagation()}>
            <CommandDialog open={findDialog} onOpenChange={setFindDialog}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Cities">
                        {cityMarks.map((item, index) => (
                            <CommandItem
                                key={index}
                                onSelect={() => {
                                    handleSelectMarker(item.posX, item.posY, item.floor);
                                    setFindDialog(false);
                                }}
                            >
                                <Building />
                                <span>{item.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
        </div>
    );
}
