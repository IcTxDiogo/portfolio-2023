import { type CitiesMarkers } from "@/app/(pages)/project/pokebro-map/page";

type ShowNameCityProps = {
    scale: number;
    cityMarks: CitiesMarkers;
};

function getTextClass(scale: number) {
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

export default function ShowNameCity({ scale, cityMarks }: ShowNameCityProps) {
    return (
        <>
            {cityMarks.map((item, index) => (
                <div
                    key={index}
                    className={`absolute z-50 ${getTextClass(scale)} font-semibold text-white`}
                    style={{
                        left: `${item.posX}px`,
                        top: `${item.posY}px`,
                        transform: `translate(-50%, -50%)`,
                        textShadow: "0 0 10px black",
                    }}
                >
                    {item.name}
                </div>
            ))}
        </>
    );
}
