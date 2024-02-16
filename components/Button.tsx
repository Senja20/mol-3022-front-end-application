const ButtonComponent = ({
  onClick,
  displayText,
  displayColor,
}: {
  onClick: () => void;
  displayText: string;
  displayColor: string;
}) => {
  return (
    <button
      className={`px-6 py-3 bg-${displayColor}-500 text-white rounded-lg mb-4 focus:outline-none hover:bg-${displayColor}-600`}
      onClick={onClick}
    >
      {displayText}
    </button>
  );
};

export default ButtonComponent;
