import { useRef, useReducer, useEffect, type RefObject, useState } from "react";
import {
    startSlide,
    sliding,
    zoom,
    goto,
    resize,
    goToMaxZoom,
    touchStart,
    touchMove,
    buttonZoom,
} from "./actions";
import reducer from "./reducer";

export const MIN_ZOOM = -3;
export const MAX_ZOOM = 8;

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

export default function useMapControl() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoaded, setIsLoaded] = useState(false);
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

    useEffect(() => {
        const divRect = getDivRect();
        if (!divRect) return;
        dispatch(goto(divRect.width / 2, divRect.height / 2, divRect));
        setIsLoaded(true);
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

    function onTouchStart(e: TouchEvent) {
        const touch = e.touches[0];
        if (!touch) return;
        dispatch(touchStart({ x: touch.clientX, y: touch.clientY }));
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);
    }

    function onTouchEnd() {
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchmove", onTouchMove);
    }

    function onTouchMove(e: TouchEvent) {
        const touch = e.touches[0];
        if (!touch) return;
        dispatch(touchMove({ x: touch.clientX, y: touch.clientY }));
    }

    function doZoom(zoomIn: boolean) {
        const divRect = getDivRect();
        if (!divRect) return;
        dispatch(buttonZoom(zoomIn, divRect));
    }

    return {
        ...state,
        divRef,
        isLoaded,
        onMouseDown,
        onZoom,
        selectMarker,
        maxZoom,
        onTouchStart,
        doZoom,
    };
}
