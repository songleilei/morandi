import { RefObject, useEffect } from "react";

function useClickOutSide(ref: RefObject<HTMLDivElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      console.log("ref.current", ref.current);
      console.log("event.target", event.target);

      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutSide;
