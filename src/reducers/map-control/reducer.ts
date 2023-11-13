import { type types } from "./actions";

type Action = {
    type?: (typeof types)[keyof typeof types];
    mouseX?: number;
    mouseY?: number;
    zoomIn?: boolean;
    zoomScale?: number;
    divRect?: DOMRect;
    x?: number;
    y?: number;
};

export const initialState = {
    posX: 0,
    posY: 0,
    oldPosX: 0,
    oldPosY: 0,
    scale: 1,
    scaleHeight: 0,
    width: 0,
    height: 0,
};

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case "SLIDE_START":
            if (action.mouseX === undefined || action.mouseY === undefined) return state;
            return {
                ...state,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        case "SLIDE":
            if (action.mouseX === undefined || action.mouseY === undefined) return state;
            return {
                ...state,
                posX: state.posX + action.mouseX - state.oldPosX,
                posY: state.posY + action.mouseY - state.oldPosY,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        case "ZOOM":
            if (action.mouseX === undefined || action.mouseY === undefined) return state;
            if (action.zoomScale === undefined || action.divRect === undefined) return state;
            //zoom in/out with mouse wheel on cursor position
            const newZoomScale = action.zoomIn
                ? state.scale * action.zoomScale
                : state.scale / action.zoomScale;
            const newScaleHeight = state.scaleHeight + (action.zoomIn ? 1 : -1);
            const x = action.mouseX - action.divRect.left;
            const y = action.mouseY - action.divRect.top;
            const newPosX = state.posX + x - x * (newZoomScale / state.scale);
            const newPosY = state.posY + y - y * (newZoomScale / state.scale);

            return {
                ...state,
                scale: newZoomScale,
                posX: newPosX,
                posY: newPosY,
                scaleHeight: newScaleHeight,
            };
        case "GOTO":
            if (action.x === undefined || action.y === undefined || action.divRect === undefined)
                return state;
            //calculate the new offset to center the x,y position on center of the screen
            const newGotoPosX = state.width / 2 - action.x * state.scale;
            const newGotoPosY = state.height / 2 - action.y * state.scale;

            return {
                ...state,
                posX: newGotoPosX,
                posY: newGotoPosY,
            };
        case "RESIZE":
            if (action.x === undefined || action.y === undefined) return state;
            return {
                ...state,
                width: action.x,
                height: action.y,
            };

        default:
            return state;
    }
}
