import { Suspense } from "react";

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
            <Suspense
                fallback={
                    <div className="flex h-screen flex-col items-center justify-center">
                        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
                        <span className={"animate-pulse"}>Loading...</span>
                    </div>
                }
            >
                <MapControl session={session} />
            </Suspense>
        </>
    );
}
