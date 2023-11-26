import { CommandEmpty, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Building, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";

type ShowFindDialogListProps = {
    dialogSearchValue: string;
    handleSelectMarker: (marker: MapMarkers[number]) => void;
    setFindDialog: (open: boolean) => void;
};

export default function ShowFindDialogList({
    dialogSearchValue,
    handleSelectMarker,
    setFindDialog,
}: ShowFindDialogListProps) {
    const [debouncedSearchValue, setDebouncedSearchValue] = useState(dialogSearchValue);
    const searchResult = api.pokebroMap.markSearch.useQuery(
        {
            query: debouncedSearchValue,
            type: ["trials"],
        },
        {
            enabled: debouncedSearchValue.length >= 3,
        },
    );

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
            {result?.map((mark) => (
                <CommandItem
                    key={mark.id}
                    onSelect={() => {
                        handleSelectMarker(mark);
                        setFindDialog(false);
                    }}
                >
                    <div className={"flex items-center justify-center gap-2"}>
                        {mark.type === "city-name" ? <Building /> : <Coins />}
                        <span>{mark.name}</span>
                    </div>
                </CommandItem>
            ))}

            <CommandSeparator />
        </CommandList>
    );
}
