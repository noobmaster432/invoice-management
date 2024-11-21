import PropTypes from "prop-types";

const Table = ({ data, columns }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-gray-300 px-4 py-2 bg-gray-200 text-left"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {row[col.key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="border border-gray-300 px-4 py-2 text-center text-black"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;
