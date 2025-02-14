const OperationButton = ({ label, onClick }) => {
  return (
    <button
      className="w-full p-3 bg-green-50 border border-green-100 rounded-lg font-medium text-green-600 hover:bg-green-100 transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default OperationButton;
