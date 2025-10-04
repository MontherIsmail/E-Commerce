interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton = ({ rows = 5, columns = 4 }: TableSkeletonProps) => {
  return (
    <div className="animate-pulse">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {colIndex === 0 ? (
                    <div className="h-12 w-12 bg-gray-300 rounded-lg mx-auto"></div>
                  ) : (
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

