import React, { useState } from "react";
import SheetDisplay from "./SheetDisplay";

interface SheetMusicItem {
    name: string;
    path: string;
    description?: string;
}

interface SheetMusicGalleryProps {
    sheets: SheetMusicItem[];
    defaultSheet?: number;
    showSelector?: boolean;
}

export default function SheetMusicGallery({
    sheets,
    defaultSheet = 0,
    showSelector = true,
}: SheetMusicGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(defaultSheet);

    if (!sheets.length) {
        return <div>No sheet music available</div>;
    }

    const currentSheet = sheets[selectedIndex];

    return (
        <div className="sheet-music-gallery">
            {showSelector && sheets.length > 1 && (
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="sheet-selector">Select sheet music: </label>
                    <select
                        id="sheet-selector"
                        value={selectedIndex}
                        onChange={(e) =>
                            setSelectedIndex(parseInt(e.target.value))
                        }
                        style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
                    >
                        {sheets.map((sheet, index) => (
                            <option key={index} value={index}>
                                {sheet.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {currentSheet.description && (
                <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                    {currentSheet.description}
                </p>
            )}

            <SheetDisplay key={selectedIndex} mxl={currentSheet.path} />
        </div>
    );
}
