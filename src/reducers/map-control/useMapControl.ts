import { useRef, useReducer, useEffect, type RefObject } from "react";
import { startSlide, sliding, zoom, goto, resize, goToMaxZoom } from "./actions";
import reducer, { initialState } from "./reducer";

export const MIN_ZOOM = -3;
export const MAX_ZOOM = 8;

export default function useMapControl() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const divRef = useRef(null);

    useEffect(() => {
        function onResize() {
            dispatch(resize(window.innerWidth, window.innerHeight));
        }

        onResize();

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    function onMouseDown(e: MouseEvent) {
        e.preventDefault();
        dispatch(startSlide(e.clientX, e.clientY));
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onSlide);
    }

    function onMouseUp() {
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mousemove", onSlide);
    }

    function onSlide(e: MouseEvent) {
        dispatch(sliding(e.clientX, e.clientY));
    }

    function onZoom(e: WheelEvent) {
        if (
            (state.scaleHeight > MIN_ZOOM && e.deltaY > 0) ||
            (state.scaleHeight < MAX_ZOOM && e.deltaY < 0)
        ) {
            const divRect = getDivRect();
            if (!divRect) return;
            dispatch(zoom(e.clientX, e.clientY, e.deltaY < 0, divRect));
        }
    }

    function selectMarker(x: number, y: number) {
        const divRect = getDivRect();
        if (!divRect) return;
        dispatch(goto(x, y, divRect));
    }

    function maxZoom() {
        dispatch(goToMaxZoom());
    }

    function getDivRect() {
        if (!divRef.current) return undefined;
        const divRect: RefObject<HTMLDivElement> = divRef;
        return divRect.current?.getBoundingClientRect();
    }

    return {
        ...state,
        divRef,
        onMouseDown,
        onZoom,
        selectMarker,
        maxZoom,
    };
}
