import MapControl from "@/components/project/pokebro-map/mapControl";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export type MapMarkers = {
    id: number;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    posX: number;
    posY: number;
    floor: number;
    information: string | null;
}[];

export default async function Page() {
    const cityMarks = await api.pokebroMap.getCitiesMarkers.query();
    return (
        <>
            <MapControl cityMarks={cityMarks} />
        </>
    );
}
