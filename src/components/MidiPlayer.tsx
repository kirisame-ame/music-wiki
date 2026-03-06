import React, { ReactElement, useEffect, useRef, useState } from "react";

interface MidiPlayerProps {
    src: string;
}

// Global script loading state
let scriptLoadPromise: Promise<void> | null = null;

const loadMidiPlayerScript = (): Promise<void> => {
    // If script is already loaded or loading, return the existing promise
    if (scriptLoadPromise) {
        return scriptLoadPromise;
    }

    // Check if custom element is already defined
    if (customElements.get("midi-player")) {
        return Promise.resolve();
    }

    // Create new loading promise
    scriptLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
            "https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.5.0";
        script.async = true;
        script.onload = () => {
            console.log("External script loaded");
            resolve();
        };
        script.onerror = () => {
            console.error("Error loading external script");
            scriptLoadPromise = null; // Reset on error so it can be retried
            reject(new Error("Failed to load midi-player script"));
        };
        document.head.appendChild(script);
    });

    return scriptLoadPromise;
};

function MidiPlayer({ src }: MidiPlayerProps): ReactElement {
    const midiFile = src;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const midiPlayerRef = useRef<any | null>(null);

    useEffect(() => {
        // Load script globally
        loadMidiPlayerScript()
            .then(() => {
                setScriptLoaded(true);
            })
            .catch((error) => {
                console.error("Failed to load midi-player script:", error);
                setScriptLoaded(false);
            });
    }, []);

    useEffect(() => {
        // Once the script is loaded, create the MIDI player
        if (scriptLoaded && containerRef.current && midiFile) {
            console.log("Creating MIDI player with URL:", midiFile);

            // Remove any previous MIDI player
            containerRef.current.innerHTML = "";

            try {
                // Create and configure a new MIDI player
                const midiPlayer = document.createElement("midi-player");
                midiPlayer.setAttribute("src", midiFile);
                midiPlayer.setAttribute(
                    "sound-font",
                    "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus",
                );
                midiPlayer.setAttribute("visualizer", "#myVisualizer");

                // Set dimensions
                midiPlayer.style.width = "280px";
                midiPlayer.style.height = "40px";

                containerRef.current.appendChild(midiPlayer);

                // Store the reference to the player
                midiPlayerRef.current = midiPlayer;

                console.log("MIDI player created successfully");
            } catch (error) {
                console.error("Error creating MIDI player:", error);
            }

            // Cleanup the MIDI player on re-render
            return () => {
                // Stop playback if the player exists
                if (midiPlayerRef.current) {
                    try {
                        midiPlayerRef.current.stop?.();
                    } catch (error) {
                        console.warn("Error stopping MIDI player:", error);
                    }
                    midiPlayerRef.current = null;
                }

                if (containerRef.current) {
                    containerRef.current.innerHTML = "";
                }
            };
        }
    }, [scriptLoaded, midiFile]);

    return (
        <>
            <style>
                {`
                    /* CSS custom properties for button styling */
                    midi-player {
                        --button-color: #333;
                        --control-color: #333;
                        color: #333;
                    }
                    
                    /* Attempt to style buttons using global selectors */
                    midi-player::part(play-button) {
                        color: #333;
                    }
                `}
            </style>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <div ref={containerRef}></div>
            </div>
        </>
    );
}

export default MidiPlayer;
