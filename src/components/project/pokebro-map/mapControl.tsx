"use client";

import { Building, Coins } from "lucide-react";
import { type Session } from "next-auth";
import { useState } from "react";

import UserSessionButton from "@/components/project/pokebro-map/userSessionButton";
import AddNewMarkDialog from "@/components/project/pokebro-map/addNewMarkDialog";
import MenuNavigation from "@/components/project/pokebro-map/menuNavigation";
import ShowFindDialog from "@/components/project/pokebro-map/showFindDialog";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import ShowMarkMap from "@/components/project/pokebro-map/showMarkMap";
import useMapControl from "@/reducers/map-control/useMapControl";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const IMAGE_SIZE = 2048;

type MapControlProps = {
    session: Session | null;
};

export default function MapControl({ session }: MapControlProps) {
    const {
        posX,
        posY,
        scale,
        divRef,
        isLoaded,
        onMouseDown,
        onZoom,
        selectMarker,
        maxZoom,
        onTouchStart,
        doZoom,
    } = useMapControl();
    const [floor, setFloor] = useState(7);
    const [showNameCity, setShowNameCity] = useState(true);
    const [showTrail, setShowTrail] = useState(false);
    const [trailMarks, setTrailMarks] = useState<MapMarkers>([]);
    const [findDialog, setFindDialog] = useState(false);
    const cityMarks =
        api.pokebroMap.getCitiesMarkers.useQuery(undefined, {
            staleTime: Infinity,
        }).data ?? [];

    function getStyleOfDiv() {
        let fileFloor = 7;

        if (floor < 7) {
            fileFloor = 7 + (7 - floor);
        }
        if (floor > 7) {
            fileFloor = 7 - (floor - 7);
        }
        return {
            transform: `translate(${posX}px, ${posY}px) scale(${scale})`,
            backgroundImage: `url(/pokebro-map/map-images/${fileFloor}.png)`,
            width: `${IMAGE_SIZE}px`,
            height: `${IMAGE_SIZE}px`,
        };
    }

    function handleSelectMarker(marker: MapMarkers[number]) {
        if (marker.type === "trails") {
            setTrailMarks((marks) => [...marks, marker]);
            setShowTrail(true);
            maxZoom();
        }
        setFloor(marker.floor);
        selectMarker(marker.posX, marker.posY);
    }

    function getMousePosition(e: MouseEvent) {
        const x = (e.clientX - posX) / scale;
        const y = (e.clientY - posY) / scale;
        return { x, y, floor };
    }

    const style = getStyleOfDiv();

    return (
        <>
            {(!isLoaded || cityMarks.length === 0) && (
                <main className="flex h-screen flex-col items-center justify-center">
                    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
                    <span className={"animate-pulse"}>Loading...</span>
                </main>
            )}
            <main
                className={
                    !isLoaded || cityMarks.length === 0
                        ? "hidden"
                        : "pokebro-map m-0 h-screen w-screen overflow-x-hidden overflow-y-hidden bg-black"
                }
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                onWheel={(e) => onZoom(e.nativeEvent)}
                onTouchStart={(e) => onTouchStart(e.nativeEvent)}
            >
                <AddNewMarkDialog getMousePosition={getMousePosition} userType={session?.user.role}>
                    <div style={style} ref={divRef}>
                        {showNameCity && (
                            <ShowMarkMap scale={scale} Marks={cityMarks} actualFloor={floor} />
                        )}
                        {showTrail && (
                            <ShowMarkMap scale={scale} Marks={trailMarks} actualFloor={floor} />
                        )}
                    </div>
                    <MenuNavigation
                        className={!isLoaded || cityMarks.length === 0 ? "hidden" : ""}
                        floor={floor}
                        setFloor={setFloor}
                        doZoom={doZoom}
                        setFindDialog={setFindDialog}
                        topItems={<UserSessionButton session={session} />}
                        bottomItems={
                            <>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    onClick={() => setShowNameCity(!showNameCity)}
                                    aria-label={"Show city names"}
                                >
                                    <Building />
                                </Button>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    onClick={() => setShowTrail(!showTrail)}
                                    aria-label={"Show trail marks"}
                                >
                                    <Coins />
                                </Button>
                            </>
                        }
                    />
                    <ShowFindDialog
                        handleSelectMarker={handleSelectMarker}
                        findDialog={findDialog}
                        setFindDialog={setFindDialog}
                    />
                </AddNewMarkDialog>
            </main>
        </>
    );
}
