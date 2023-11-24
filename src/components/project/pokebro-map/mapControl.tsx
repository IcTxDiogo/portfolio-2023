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

type MapControlProps = {
    cityMarks: MapMarkers;
    trailMarks: MapMarkers;
    session: Session | null;
};

export default function MapControl({ cityMarks, trailMarks, session }: MapControlProps) {
    const { posX, posY, scale, divRef, onMouseDown, onZoom, selectMarker } = useMapControl();
    const [floor, setFloor] = useState(7);
    const [showNameCity, setShowNameCity] = useState(true);
    const [showTrail, setShowTrail] = useState(false);

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

    function handleSelectMarker(x: number, y: number, floor: number) {
        setFloor(floor);
        selectMarker(x, y);
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
                        {showNameCity && <ShowMarkMap scale={scale} Marks={cityMarks} />}
                        {showTrail && <ShowMarkMap scale={scale} Marks={trailMarks} />}
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
                    <ShowFindDialog cityMarks={cityMarks} handleSelectMarker={handleSelectMarker} />
                </AddNewMarkDialog>
            </main>
        </>
    );
}
