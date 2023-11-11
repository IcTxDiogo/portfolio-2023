import { type types } from "@/reducers/pokebro-map/actions";

type Action = {
    type?: (typeof types)[keyof typeof types];
    mouseX?: number;
    mouseY?: number;
    zoomIn?: boolean;
    zoomScale?: number;
    divRect?: DOMRect;
};

export const initialState = {
    posX: 0,
    posY: 0,
    oldPosX: 0,
    oldPosY: 0,
    scale: 1,
    scaleHeight: 0,
};

export default function reducer(state = initialState, action: Action) {
    if (action.mouseX === undefined || action.mouseY === undefined) return state;
    switch (action.type) {
        case "SLIDE_START":
            return {
                ...state,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        case "SLIDE":
            return {
                ...state,
                posX: state.posX + action.mouseX - state.oldPosX,
                posY: state.posY + action.mouseY - state.oldPosY,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        case "ZOOM":
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

        default:
            return state;
    }
}
