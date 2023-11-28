import MapControl from "@/components/project/pokebro-map/mapControl";
import { type inferAsyncReturnType } from "@trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { type api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export type MapMarkers = NonNullable<
    inferAsyncReturnType<typeof api.pokebroMap.getCitiesMarkers.query>
>;

export const revalidate = 3600;

export default async function Page() {
    const session = await getServerAuthSession();
    return (
        <>
            <MapControl session={session} />
        </>
    );
}
