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

type MapControlProps = {
    session: Session | null;
};

export default function MapControl({ session }: MapControlProps) {
    const { posX, posY, scale, divRef, onMouseDown, onZoom, selectMarker, maxZoom } =
        useMapControl();
    const [floor, setFloor] = useState(7);
    const [showNameCity, setShowNameCity] = useState(true);
    const [showTrail, setShowTrail] = useState(false);
    const [trailMarks, setTrailMarks] = useState<MapMarkers>([]);
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
            width: "2048px",
            height: "2048px",
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
            <main
                className={"pokebro-map h-screen overflow-x-hidden overflow-y-hidden bg-black"}
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                onWheel={(e) => onZoom(e.nativeEvent)}
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
                    <MenuNavigation floor={floor} setFloor={setFloor}>
                        <UserSessionButton session={session} />
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setShowNameCity(!showNameCity)}
                        >
                            <Building />
                        </Button>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setShowTrail(!showTrail)}
                        >
                            <Coins />
                        </Button>
                    </MenuNavigation>
                    <ShowFindDialog handleSelectMarker={handleSelectMarker} />
                </AddNewMarkDialog>
            </main>
        </>
    );
}
