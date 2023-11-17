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
import { ZOOM_SCALE } from "@/reducers/map-control/actions";

type MapControlProps = {
    cityMarks: MapMarkers;
};

export default function MapControl({ cityMarks }: MapControlProps) {
    const { posX, posY, scale, scaleHeight, divRef, onMouseDown, onZoom, selectMarker } =
        useMapControl();
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
        setFloor(floor);
        selectMarker(x, y);
    }

    function getMousePosition(e: MouseEvent) {
        let calculatedPoxY = e.clientY - posY;
        let calculatedPosX = e.clientX - posX;
        let calculatedScale = scale;
        console.log(scale);
        if (scaleHeight !== 0) {
            if (scaleHeight < 0) {
                for (let i = 0; i < Math.abs(scaleHeight); i++) {
                    calculatedPoxY = calculatedPoxY * ZOOM_SCALE;
                    calculatedPosX = calculatedPosX * ZOOM_SCALE;
                    calculatedScale = calculatedScale * ZOOM_SCALE;
                    console.log(calculatedPoxY, calculatedPosX, calculatedScale);
                }
            } else {
                for (let i = 0; i < Math.abs(scaleHeight); i++) {
                    calculatedPoxY = calculatedPoxY / ZOOM_SCALE;
                    calculatedPosX = calculatedPosX / ZOOM_SCALE;
                    calculatedScale = calculatedScale / ZOOM_SCALE;
                    console.log(calculatedPoxY, calculatedPosX, calculatedScale);
                }
            }
        }
        const x = calculatedPoxY;
        const y = calculatedPosX;
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
                <AddNewMarkDialog getMousePosition={getMousePosition}>
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
                        </MenuNavigation>
                    </div>
                    <ShowFindDialog cityMarks={cityMarks} handleSelectMarker={handleSelectMarker} />
                </AddNewMarkDialog>
            </main>
        </>
    );
}
