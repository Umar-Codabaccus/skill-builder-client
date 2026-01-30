import { useState, useEffect } from "react";

function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState("");

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;

            if (width >= 1400) {
                setBreakpoint("xxl");
            } else if (width >= 1200) {
                setBreakpoint("xl");
            } else if (width >= 992) {
                setBreakpoint("lg");
            } else if (width >= 768) {
                setBreakpoint("md");
            } else if (width >= 576) {
                setBreakpoint("sm");
            } else {
                setBreakpoint("xs");
            }
        }

        update();

        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return breakpoint;
}

export default useBreakpoint;