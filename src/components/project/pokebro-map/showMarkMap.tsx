import { type MapMarkers } from "@/app/(pages)/project/pokebro-map/page";
import { MapPin } from "lucide-react";

type ShowNameCityProps = {
    scale: number;
    Marks: MapMarkers;
};

function getTextClass(scale: number, type: string) {
    if (type === "city-name") {
        if (scale > 13) {
            return "text-xs";
        }
        if (scale > 10) {
            return "text-sm";
        }
        if (scale > 7) {
            return "text-base";
        }
        if (scale > 5) {
            return "text-lg";
        }
        if (scale > 3) {
            return "text-xl";
        }
        if (scale > 1) {
            return "text-xl";
        }
        if (scale > 0.8) {
            return "text-2xl";
        }
        if (scale > 0.5) {
            return "text-3xl";
        }
        return "text-4xl";
    }
}

export default function ShowMarkMap({ scale, Marks }: ShowNameCityProps) {
    return (
        <>
            {Marks.map((item, index) => (
                <div
                    key={index}
                    className={`absolute z-50 ${getTextClass(
                        scale,
                        item.type,
                    )} font-semibold text-white`}
                    style={{
                        left: `${item.posX}px`,
                        top: `${item.posY}px`,
                        transform: `translate(${
                            item.type === "trilha" ? "-48%,-93%" : "-50%, -50%"
                        })`,
                        textShadow: "0 0 10px black",
                    }}
                >
                    {item.type === "trilha" ? <MapPin /> : item.name}
                </div>
            ))}
        </>
    );
}
