import MapControl from "@/components/project/pokebro-map/mapControl";
import { api } from "@/trpc/server";
import { type inferAsyncReturnType } from "@trpc/server";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export type MapMarkers = NonNullable<
    inferAsyncReturnType<typeof api.pokebroMap.getCitiesMarkers.query>
>;

export const revalidate = 3600;

export default async function Page() {
    const cityMarks = await api.pokebroMap.getCitiesMarkers.query();
    const trailMarks = await api.pokebroMap.getTrailMarkers.query();
    const session = await getServerAuthSession();
    return (
        <>
            <MapControl
                cityMarks={cityMarks}
                trailMarks={trailMarks}
                topNavigationItem={
                    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                        <Button variant={"outline"} size={"icon"}>
                            {session ? <LogOut /> : <LogIn />}
                        </Button>
                    </Link>
                }
            />
        </>
    );
}
