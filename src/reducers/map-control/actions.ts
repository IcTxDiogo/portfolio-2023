import { type Action } from "@/reducers/map-control/reducer";

export const ZOOM_SCALE = 1.4;

export const types = {
    BASE_ACTION: "BASE_ACTION",
    SLIDE: "SLIDE",
    SLIDE_START: "SLIDE_START",
    ZOOM: "ZOOM",
    GOTO: "GOTO",
    RESIZE: "RESIZE",
    GO_TO_MAX_ZOOM: "GO_TO_MAX_ZOOM",
};

const baseAction: Action = {
    type: types.BASE_ACTION,
    mouseX: 0,
    mouseY: 0,
    zoomIn: false,
    zoomScale: 0,
    divRect: null as unknown as DOMRect,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

export function startSlide(mouseX: number, mouseY: number) {
    return {
        ...baseAction,
        type: types.SLIDE_START,
        mouseX,
        mouseY,
    };
}

export function sliding(mouseX: number, mouseY: number) {
    return {
        ...baseAction,
        type: types.SLIDE,
        mouseX,
        mouseY,
    };
}

export function zoom(mouseX: number, mouseY: number, zoomIn: boolean, divRect: DOMRect) {
    return {
        ...baseAction,
        type: types.ZOOM,
        zoomScale: ZOOM_SCALE,
        mouseX,
        mouseY,
        zoomIn,
        divRect,
    };
}

export function goto(x: number, y: number, divRect: DOMRect) {
    return {
        ...baseAction,
        type: types.GOTO,
        x,
        y,
        divRect,
    };
}

export function resize(width: number, height: number) {
    return {
        ...baseAction,
        type: types.RESIZE,
        width,
        height,
    };
}

export function goToMaxZoom() {
    return {
        ...baseAction,
        type: types.GO_TO_MAX_ZOOM,
        zoomScale: ZOOM_SCALE,
    };
}
