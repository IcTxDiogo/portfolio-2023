import { initialState, MAX_ZOOM } from "@/reducers/map-control/useMapControl";
import { type Action } from "@/reducers/map-control/actions";

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        case "BASE_ACTION": {
            return {
                ...state,
            };
        }
        case "SLIDE_START": {
            return {
                ...state,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        }
        case "SLIDE": {
            return {
                ...state,
                posX: state.posX + action.mouseX - state.oldPosX,
                posY: state.posY + action.mouseY - state.oldPosY,
                oldPosX: action.mouseX,
                oldPosY: action.mouseY,
            };
        }
        case "ZOOM": {
            //calculates a new zoom scale based on zoomIn
            const scale = action.zoomIn
                ? state.scale * action.zoomScale
                : state.scale / action.zoomScale;
            //increment or decrement the scaleHeight based on zoomIn
            const scaleHeight = state.scaleHeight + (action.zoomIn ? 1 : -1);
            //calculate the position of the mouse relative to the div
            const x = action.mouseX - action.divRect.left;
            const y = action.mouseY - action.divRect.top;
            //calculate the new offset based on mouse position
            const posX = state.posX + x - x * (scale / state.scale);
            const posY = state.posY + y - y * (scale / state.scale);
            return {
                ...state,
                scale,
                posX,
                posY,
                scaleHeight,
            };
        }
        case "GOTO": {
            return {
                ...state,
                posX: state.width / 2 - action.x * state.scale,
                posY: state.height / 2 - action.y * state.scale,
            };
        }
        case "RESIZE": {
            return {
                ...state,
                width: action.width,
                height: action.height,
            };
        }
        case "GO_TO_MAX_ZOOM": {
            let scaleHeight = state.scaleHeight;
            let scale = state.scale;
            while (scaleHeight < MAX_ZOOM - 2) {
                scaleHeight++;
                scale *= action.zoomScale;
            }
            return {
                ...state,
                scaleHeight,
                scale,
            };
        }
        case "TOUCH_START": {
            return {
                ...state,
                oldPosX: action.touchOne.x,
                oldPosY: action.touchOne.y,
            };
        }
        case "TOUCH_MOVE": {
            return {
                ...state,
                posX: state.posX + action.touchOne.x - state.oldPosX,
                posY: state.posY + action.touchOne.y - state.oldPosY,
                oldPosX: action.touchOne.x,
                oldPosY: action.touchOne.y,
            };
        }
        case "DO_ZOOM": {
            //calculates a new zoom scale based on zoomIn
            const scale = action.zoomIn
                ? state.scale * action.zoomScale
                : state.scale / action.zoomScale;
            //increment or decrement the scaleHeight based on zoomIn
            const scaleHeight = state.scaleHeight + (action.zoomIn ? 1 : -1);
            // Calculate the center of the screen to keep it in the same place
            const centerX = window.innerWidth / 2 - action.divRect.left;
            const centerY = window.innerHeight / 2 - action.divRect.top;
            //calculate the new offset based in the center of the screen
            const posX = state.posX + centerX - centerX * (scale / state.scale);
            const posY = state.posY + centerY - centerY * (scale / state.scale);
            return {
                ...state,
                scale,
                posX,
                posY,
                scaleHeight,
            };
        }

        default:
            return state;
    }
}
