import {
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Building, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";

type ShowFindDialogListProps = {
    dialogSearchValue: string;
    cityMarks: MapMarkers;
    handleSelectMarker: (marker: MapMarkers[number]) => void;
    setFindDialog: (open: boolean) => void;
};

export default function ShowFindDialogList({
    dialogSearchValue,
    handleSelectMarker,
    cityMarks,
    setFindDialog,
}: ShowFindDialogListProps) {
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

    return (
        <CommandList>
            <CommandEmpty>
                {dialogSearchValue.length < 3 ? "type a less 3 character" : "No results found"}
            </CommandEmpty>
            {result !== undefined && result.length > 0 ? (
                result.map((mark) => (
                    <CommandItem
                        key={mark.id}
                        onSelect={() => {
                            handleSelectMarker(mark);
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
                                handleSelectMarker(item);
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
    );
}
