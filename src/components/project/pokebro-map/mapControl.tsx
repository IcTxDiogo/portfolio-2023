"use client";

import { useState } from "react";

import useMapControl from "@/reducers/map-control/useMapControl";
import MenuNavigation from "@/components/project/pokebro-map/menuNavigation";

export default function MapControl() {
    const { posX, posY, scale, divRef, onMouseDown, onZoom } = useMapControl();
    const [floor, setFloor] = useState(7);

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

    const style = getStyleOfDiv();

    return (
        <>
            <main
                className={"pokebro-map h-screen overflow-x-hidden overflow-y-hidden bg-black"}
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                onWheel={(e) => onZoom(e.nativeEvent)}
            >
                <div style={style} ref={divRef}></div>
                <div
                    className={
                        "absolute inset-y-0 right-[20px] z-50 flex flex-row items-center justify-center gap-2 "
                    }
                >
                    <MenuNavigation floor={floor} setFloor={setFloor} />
                </div>
            </main>
        </>
    );
}
