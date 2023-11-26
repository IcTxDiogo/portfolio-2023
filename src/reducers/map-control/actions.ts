import { type RefObject } from "react";

export const ZOOM_SCALE = 1.4;

export const types = {
    SLIDE: "SLIDE",
    SLIDE_START: "SLIDE_START",
    ZOOM: "ZOOM",
    GOTO: "GOTO",
    RESIZE: "RESIZE",
    GO_TO_MAX_ZOOM: "GO_TO_MAX_ZOOM",
};

export function startSlide(e: MouseEvent) {
    return {
        type: types.SLIDE_START,
        mouseX: e.clientX,
        mouseY: e.clientY,
    };
}

export function sliding(e: MouseEvent) {
    return {
        type: types.SLIDE,
        mouseX: e.clientX,
        mouseY: e.clientY,
    };
}

export function zoom(e: WheelEvent, divRef: RefObject<HTMLDivElement>) {
    if (!divRef.current) {
        return {
            type: types.ZOOM,
            divRect: undefined,
        };
    }
    return {
        type: types.ZOOM,
        zoomIn: e.deltaY < 0,
        mouseX: e.clientX,
        mouseY: e.clientY,
        zoomScale: ZOOM_SCALE,
        divRect: divRef.current.getBoundingClientRect(),
    };
}

export function goto(x: number, y: number, divRef: RefObject<HTMLDivElement>) {
    return {
        type: types.GOTO,
        x,
        y,
        divRect: divRef.current?.getBoundingClientRect(),
    };
}

export function resize(width: number, height: number) {
    return {
        type: types.RESIZE,
        x: width,
        y: height,
    };
}

export function goToMaxZoom() {
    return {
        type: types.GO_TO_MAX_ZOOM,
        zoomScale: ZOOM_SCALE,
    };
}
