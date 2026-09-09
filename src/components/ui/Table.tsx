import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (
    item: T,
    index: number
  ) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (item: T) => string;
  emptyMessage?: string;
}

export default function Table<T>({
  data,
  columns,
  rowKey,
  emptyMessage = "No data found",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    whitespace-nowrap
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-500
                    ${column.className ?? ""}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={rowKey(item)}
                  className="transition hover:bg-gray-50"
                >
                  {columns.map(
                    (column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap px-4 py-3 text-sm text-gray-700"
                      >
                        {column.render(
                          item,
                          index
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}