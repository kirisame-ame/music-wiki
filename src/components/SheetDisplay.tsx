import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import React, { useEffect, useRef, useState } from "react";

interface SheetDisplayProps {
    mxl: string;
    width?: number;
    height?: number;
    showMetadata?: boolean;
}

export default function SheetDisplay({
    mxl,
    width,
    height,
    showMetadata = true,
}: SheetDisplayProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const osmdRef = useRef<OpenSheetMusicDisplay | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadSheet = async () => {
            if (!divRef.current || !mxl) return;

            try {
                setIsLoading(true);
                setError(null);

                // Create OSMD instance
                osmdRef.current = new OpenSheetMusicDisplay(divRef.current, {
                    autoResize: true,
                    backend: "svg",
                    drawTitle: showMetadata,
                    drawSubtitle: showMetadata,
                    drawComposer: showMetadata,
                    drawCredits: showMetadata,
                });

                // Load the MXL file
                await osmdRef.current.load(mxl);

                // Only render if component is still mounted
                if (mounted) {
                    osmdRef.current.render();
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Error loading sheet music:", err);
                if (mounted) {
                    setError("Failed to load sheet music");
                    setIsLoading(false);
                }
            }
        };

        loadSheet();

        // Cleanup function
        return () => {
            mounted = false;
            if (osmdRef.current) {
                osmdRef.current.clear();
                osmdRef.current = null;
            }
        };
    }, [mxl, showMetadata]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (osmdRef.current) {
                osmdRef.current.render();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (error) {
        return <div className="osmd-error">Error: {error}</div>;
    }

    return (
        <div style={{ width: width || "100%", height: height || "auto" }}>
            {isLoading && (
                <div className="osmd-loading">Loading sheet music...</div>
            )}
            <div
                ref={divRef}
                className="osmd-container"
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
