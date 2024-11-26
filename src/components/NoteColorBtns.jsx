import { CircleCheck } from "lucide-react";
import { useState } from "react";

const ColorButtons = ({ handleNoteColor }) => {
  const buttonStyles = [
    { bg: "#fcc96e", hover: "#e0b35f" },
    { bg: "#00d3fb", hover: "#00b7dc" },
    { bg: "#e3ee8e", hover: "#cbd87c" },
    { bg: "#fd9c71", hover: "#e28562" },
    { bg: "#b493fb", hover: "#9c7de4" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <h1 className="text-sm font-semibold tracking-wide">Choose note color</h1>
      <div className="flex gap-4 p-6 w-full">
        {buttonStyles.map((style, index) => (
          <button
            key={index}
            className="font-bold h-10 w-10 rounded-full transition-colors flex justify-center items-center"
            style={{
              backgroundColor: style.bg,
              color: "#fff",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = style.hover)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = style.bg)}
            onClick={() => {
              handleNoteColor(style), setSelectedIndex(index);
            }}
          >
            {selectedIndex === index && <CircleCheck size={30} color="black" />}
          </button>
        ))}
      </div>
    </>
  );
};

export default ColorButtons;
