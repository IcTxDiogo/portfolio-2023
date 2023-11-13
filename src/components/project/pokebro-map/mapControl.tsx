"use client";

import { useState } from "react";
import { Building } from "lucide-react";

import MenuNavigation from "@/components/project/pokebro-map/menuNavigation";
import ShowNameCity from "@/components/project/pokebro-map/ShowNameCity";
import useMapControl from "@/reducers/map-control/useMapControl";
import { Button } from "@/components/ui/button";
import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import ShowFindDialog from "@/components/project/pokebro-map/showFindDialog";
import AddNewMarkDialog from "@/components/project/pokebro-map/addNewMarkDialog";

type MapControlProps = {
    cityMarks: MapMarkers;
};

export default function MapControl({ cityMarks }: MapControlProps) {
    const { posX, posY, scale, divRef, onMouseDown, onZoom, selectMarker } = useMapControl();
    const [floor, setFloor] = useState(7);
    const [showNameCity, setShowNameCity] = useState(false);

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
        console.log(x, y, floor);
        setFloor(floor);
        selectMarker(x, y);
    }

    const style = getStyleOfDiv();

    return (
        <>
            <main
                className={"pokebro-map h-screen overflow-x-hidden overflow-y-hidden bg-black"}
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                onWheel={(e) => onZoom(e.nativeEvent)}
            >
                <div style={style} ref={divRef}>
                    {showNameCity && <ShowNameCity scale={scale} cityMarks={cityMarks} />}
                </div>
                <div
                    className={
                        "absolute inset-y-0 right-[20px] z-50 flex flex-col items-center justify-center gap-2 "
                    }
                >
                    <MenuNavigation floor={floor} setFloor={setFloor}>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setShowNameCity(!showNameCity)}
                        >
                            <Building />
                        </Button>
                        <AddNewMarkDialog />
                    </MenuNavigation>
                </div>
                <ShowFindDialog cityMarks={cityMarks} handleSelectMarker={handleSelectMarker} />
            </main>
        </>
    );
}
