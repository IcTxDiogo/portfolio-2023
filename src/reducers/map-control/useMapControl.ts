import { useRef, useReducer, useEffect, type RefObject } from "react";
import {
    startSlide,
    sliding,
    zoom,
    goto,
    resize,
    goToMaxZoom,
    touchStart,
    touchMove,
    touchZoom,
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

    let initialTouchDistance: number | null = null;

    function onTouchStart(e: TouchEvent) {
        const touch = e.touches[0];
        if (!touch) return;
        if (e.touches.length === 2) {
            const touchOne = e.touches[0];
            const touchTwo = e.touches[1];
            if (!touchOne || !touchTwo) return;
            initialTouchDistance = Math.sqrt(
                (touchOne.clientX - touchTwo.clientX) ** 2 +
                    (touchOne.clientY - touchTwo.clientY) ** 2,
            );
        }
        dispatch(touchStart({ x: touch.clientX, y: touch.clientY }));
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);
    }

    function onTouchEnd() {
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchmove", onTouchMove);
    }

    function onTouchMove(e: TouchEvent) {
        //verify have two touches else one touch is a slide
        if (e.touches.length === 2) {
            const touchOne = e.touches[0];
            const touchTwo = e.touches[1];
            if (!touchOne || !touchTwo || initialTouchDistance === null) return;
            const currentTouchDistance = Math.hypot(
                touchTwo.clientX - touchOne.clientX,
                touchTwo.clientY - touchOne.clientY,
            );
            if (currentTouchDistance !== initialTouchDistance) {
                dispatch(
                    touchZoom(
                        { x: touchOne.clientX, y: touchOne.clientY },
                        { x: touchTwo.clientX, y: touchTwo.clientY },
                        currentTouchDistance > initialTouchDistance,
                    ),
                );
            }
        }
        //one touch is a slide
        else {
            const touch = e.touches[0];
            if (!touch) return;
            dispatch(touchMove({ x: touch.clientX, y: touch.clientY }));
        }
    }

    return {
        ...state,
        divRef,
        onMouseDown,
        onZoom,
        selectMarker,
        maxZoom,
        onTouchStart,
    };
}
