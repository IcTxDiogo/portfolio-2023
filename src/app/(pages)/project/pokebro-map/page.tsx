import MapControl from "@/components/project/pokebro-map/mapControl";
import { api } from "@/trpc/server";
import { type inferAsyncReturnType } from "@trpc/server";

export const dynamic = "force-dynamic";

export type MapMarkers = NonNullable<
    inferAsyncReturnType<typeof api.pokebroMap.getCitiesMarkers.query>
>;

export default async function Page() {
    const cityMarks = await api.pokebroMap.getCitiesMarkers.query();
    return (
        <>
            <MapControl cityMarks={cityMarks} />
        </>
    );
}
