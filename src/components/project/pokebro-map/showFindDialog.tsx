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
import { Building, Coins } from "lucide-react";
import { api } from "@/trpc/react";

type ShowFindDialogProps = {
    cityMarks: MapMarkers;
    handleSelectMarker: (x: number, y: number, floor: number) => void;
};

export default function ShowFindDialog({ cityMarks, handleSelectMarker }: ShowFindDialogProps) {
    const [findDialog, setFindDialog] = useState(false);
    const [dialogSearchValue, setDialogSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(dialogSearchValue);

    const searchResult = api.pokebroMap.markSearch.useQuery({
        query: debouncedSearchValue,
        type: ["trials"],
    });

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchValue(dialogSearchValue);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(timerId);
        };
    }, [dialogSearchValue]);

    const result = searchResult.data;

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
            <CommandDialog
                open={findDialog}
                onOpenChange={setFindDialog}
                shouldFilter={!(result !== undefined && result.length > 0)}
            >
                <CommandInput
                    placeholder="Type a command or search..."
                    value={dialogSearchValue}
                    onValueChange={setDialogSearchValue}
                />
                <CommandList>
                    <CommandEmpty>
                        {dialogSearchValue.length < 3
                            ? "type a less 3 character"
                            : "No results found"}
                    </CommandEmpty>
                    {result !== undefined && result.length > 0 ? (
                        result.map((mark) => (
                            <CommandItem
                                key={mark.id}
                                onSelect={() => {
                                    handleSelectMarker(mark.posX, mark.posY, mark.floor);
                                    setFindDialog(false);
                                }}
                            >
                                <Coins />
                                <span>{mark.name}</span>
                            </CommandItem>
                        ))
                    ) : (
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
                    )}
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
        </div>
    );
}
