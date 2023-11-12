import { useRef, useReducer, useEffect } from "react";
import { startSlide, sliding, zoom, goto, resize } from "./actions";
import reducer, { initialState } from "./reducer";

const MIN_ZOOM = -3;
const MAX_ZOOM = 8;

export default function useMapControl() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const divRef = useRef(null);

    useEffect(() => {
        dispatch(resize(window.innerWidth, window.innerHeight));

        window.addEventListener("resize", () => {
            dispatch(resize(window.innerWidth, window.innerHeight));
        });

        return () => {
            window.removeEventListener("resize", () => {
                dispatch(resize(window.innerWidth, window.innerHeight));
            });
        };
    }, []);

    function onMouseDown(e: MouseEvent) {
        e.preventDefault();
        dispatch(startSlide(e));
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onSlide);
    }

    function onMouseUp() {
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mousemove", onSlide);
    }

    function onSlide(e: MouseEvent) {
        dispatch(sliding(e));
    }

    function onZoom(e: WheelEvent) {
        if (
            (state.scaleHeight > MIN_ZOOM && e.deltaY > 0) ||
            (state.scaleHeight < MAX_ZOOM && e.deltaY < 0)
        ) {
            dispatch(zoom(e, divRef));
        }
    }

    function selectMarker(x: number, y: number) {
        dispatch(goto(x, y, divRef));
    }

    return {
        ...state,
        divRef,
        onMouseDown,
        onZoom,
        selectMarker,
    };
}
