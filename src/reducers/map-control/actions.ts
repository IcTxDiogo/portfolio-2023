export const ZOOM_SCALE = 1.4;

export const Types = {
    BASE_ACTION: "BASE_ACTION",
    SLIDE: "SLIDE",
    SLIDE_START: "SLIDE_START",
    ZOOM: "ZOOM",
    GOTO: "GOTO",
    RESIZE: "RESIZE",
    GO_TO_MAX_ZOOM: "GO_TO_MAX_ZOOM",
    TOUCH_START: "TOUCH_START",
    TOUCH_MOVE: "TOUCH_MOVE",
    TOUCH_ZOOM: "TOUCH_ZOOM",
};

export type Action = {
    type: (typeof Types)[keyof typeof Types];
    mouseX: number;
    mouseY: number;
    zoomIn: boolean;
    zoomScale: number;
    divRect: DOMRect;
    x: number;
    y: number;
    width: number;
    height: number;
    touchOne: Touch;
    touchTwo: Touch;
};

const baseAction: Action = {
    type: Types.BASE_ACTION,
    mouseX: 0,
    mouseY: 0,
    zoomIn: false,
    zoomScale: 0,
    divRect: null as unknown as DOMRect,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    touchOne: { x: 0, y: 0 },
    touchTwo: { x: 0, y: 0 },
};

export type Touch = {
    x: number;
    y: number;
};

export function startSlide(mouseX: number, mouseY: number) {
    return {
        ...baseAction,
        type: Types.SLIDE_START,
        mouseX,
        mouseY,
    };
}

export function sliding(mouseX: number, mouseY: number) {
    return {
        ...baseAction,
        type: Types.SLIDE,
        mouseX,
        mouseY,
    };
}

export function zoom(mouseX: number, mouseY: number, zoomIn: boolean, divRect: DOMRect) {
    return {
        ...baseAction,
        type: Types.ZOOM,
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
        type: Types.GOTO,
        x,
        y,
        divRect,
    };
}

export function resize(width: number, height: number) {
    return {
        ...baseAction,
        type: Types.RESIZE,
        width,
        height,
    };
}

export function goToMaxZoom() {
    return {
        ...baseAction,
        type: Types.GO_TO_MAX_ZOOM,
        zoomScale: ZOOM_SCALE,
    };
}

export function touchStart(touchOne: Touch) {
    return {
        ...baseAction,
        type: Types.TOUCH_START,
        touchOne,
    };
}

export function touchMove(touchOne: Touch) {
    return {
        ...baseAction,
        type: Types.TOUCH_MOVE,
        touchOne,
    };
}

export function touchZoom(touchOne: Touch, touchTwo: Touch, zoomIn: boolean) {
    return {
        ...baseAction,
        type: Types.TOUCH_ZOOM,
        touchOne,
        touchTwo,
        zoomIn,
    };
}
