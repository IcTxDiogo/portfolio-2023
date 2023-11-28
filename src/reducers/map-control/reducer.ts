import { initialState, MAX_ZOOM } from "@/reducers/map-control/useMapControl";
import { type Action } from "@/reducers/map-control/actions";

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case "BASE_ACTION":
            return {
                ...state,
            };
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
            //calculates a new zoom scale based on zoomIn
            const newZoomScale = action.zoomIn
                ? state.scale * action.zoomScale
                : state.scale / action.zoomScale;
            //increment or decrement the scaleHeight based on zoomIn
            const newScaleHeight = state.scaleHeight + (action.zoomIn ? 1 : -1);
            //calculate the position of the mouse relative to the div
            const x = action.mouseX - action.divRect.left;
            const y = action.mouseY - action.divRect.top;
            //calculate the new offset based on mouse position
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
            //calculate the new offset to center the x,y position on center of the screen
            const newGotoPosX = state.width / 2 - action.x * state.scale;
            const newGotoPosY = state.height / 2 - action.y * state.scale;

            return {
                ...state,
                posX: newGotoPosX,
                posY: newGotoPosY,
            };
        case "RESIZE":
            return {
                ...state,
                width: action.width,
                height: action.height,
            };
        case "GO_TO_MAX_ZOOM":
            let localScaleHeight = state.scaleHeight;
            let localScale = state.scale;
            while (localScaleHeight < MAX_ZOOM - 2) {
                localScaleHeight++;
                localScale *= action.zoomScale;
            }
            return {
                ...state,
                scaleHeight: localScaleHeight,
                scale: localScale,
            };
        case "TOUCH_START":
            return {
                ...state,
                oldPosX: action.touchOne.x,
                oldPosY: action.touchOne.y,
            };
        case "TOUCH_MOVE":
            return {
                ...state,
                posX: state.posX + action.touchOne.x - state.oldPosX,
                posY: state.posY + action.touchOne.y - state.oldPosY,
                oldPosX: action.touchOne.x,
                oldPosY: action.touchOne.y,
            };
        case "TOUCH_ZOOM":
            //calculates a new zoom scale based on zoomIn
            const newTouchZoomScale = action.zoomIn
                ? state.scale * action.zoomScale
                : state.scale / action.zoomScale;
            //increment or decrement the scaleHeight based on zoomIn
            const newTouchScaleHeight = state.scaleHeight + (action.zoomIn ? 1 : -1);
            // Calculate the midpoint between the two touch points
            const midX = (action.touchOne.x + action.touchTwo.x) / 2;
            const midY = (action.touchOne.y + action.touchTwo.y) / 2;
            //calculate the new offset based on touch position
            const newTouchPosX = state.posX + midX - midX * (newTouchZoomScale / state.scale);
            const newTouchPosY = state.posY + midY - midY * (newTouchZoomScale / state.scale);
            return {
                ...state,
                scale: newTouchZoomScale,
                posX: newTouchPosX,
                posY: newTouchPosY,
                scaleHeight: newTouchScaleHeight,
            };
        default:
            return state;
    }
}
