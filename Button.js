const Button = ({ label, onClick, variant = "default" }) => {
  const variants = {
    default: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
    number: "bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100",
    operator: "bg-green-50 border-green-100 text-green-600 hover:bg-green-100",
    action: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
    clear: "bg-red-50 text-red-600 hover:bg-red-100 border-red-100",
  };

  return (
    <button
      className={`
        w-full p-3 rounded-lg font-medium 
        border transition-colors
        ${variants[variant]}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
