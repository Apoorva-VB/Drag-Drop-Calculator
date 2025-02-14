const Display = ({ value }) => (
  <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-lg text-right text-4xl font-bold min-h-[80px] flex items-center justify-end">
    {value?.toString() || "0"}
  </div>
);

export default Display;
