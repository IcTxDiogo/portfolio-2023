import useMapControl from "@/reducers/pokebro-map/useMapControl";

export default function MapControl() {
    const { posX, posY, scale, divRef, onMouseDown, onZoom } = useMapControl();

    const style = {
        transform: `translate(${posX}px, ${posY}px) scale(${scale})`,
        backgroundImage: `url(https://i.imgur.com/XxL9AK0.png)`,
        width: "2048px",
        height: "2048px",
    };

    return (
        <>
            <main
                className={"pokebro-map h-screen overflow-x-hidden overflow-y-hidden"}
                onMouseDown={(e) => onMouseDown(e.nativeEvent)}
                onWheel={(e) => onZoom(e.nativeEvent)}
            >
                <div style={style} ref={divRef}></div>
            </main>
        </>
    );
}
