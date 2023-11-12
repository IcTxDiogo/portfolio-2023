import MapControl from "@/components/project/pokebro-map/mapControl";
import { api } from "@/trpc/server";

export type CitiesMarkers = {
    id: number;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    type: string | null;
    posX: number | null;
    posY: number | null;
    floor: number | null;
    information: string | null;
    deletedAt: Date | null;
}[];

export default async function Page() {
    const cityMarks = await api.pokebroMap.getCitiesMarkers.query();
    return (
        <>
            <MapControl cityMarks={cityMarks} />
        </>
    );
}
