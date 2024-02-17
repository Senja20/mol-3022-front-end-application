import React from "react";

const ButtonComponent = ({
  onClick,
  displayText,
  displayColor,
  loading,
}: {
  onClick: () => void;
  displayText: string;
  displayColor: string;
  loading?: boolean;
}) => {
  return (
    <button
      className={`px-6 py-3 text-black border border-black rounded-md mb-4 focus:outline-none hover:${displayColor}-600`}
      onClick={onClick}
      style={{
        width: "80pt",
        height: "40pt",
        position: "relative", // Add position relative to parent
      }}
      disabled={loading} // Disable the button when loading
    >
      {loading && ( // If loading is true, display the spinner
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </div>
      )}
      {!loading && displayText} {/* Display the text if not loading */}
    </button>
  );
};

export default ButtonComponent;
