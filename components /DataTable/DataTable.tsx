import React, { useState } from "react";
import { ArrowUpDown, CheckSquare, Square } from "lucide-react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  // Toggle row selection
  const toggleRowSelection = (row: T) => {
    let newSelected: T[];
    if (selectedRows.includes(row)) {
      newSelected = selectedRows.filter((r) => r !== row);
    } else {
      newSelected = selectable ? [...selectedRows, row] : [row];
    }
    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  // Toggle sorting
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      const aVal = valA !== undefined && valA !== null ? String(valA) : "";
      const bVal = valB !== undefined && valB !== null ? String(valB) : "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Loading & empty states
  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (!data.length) return <p className="p-4 text-gray-500">No data available</p>;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="px-4 py-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 text-left font-semibold text-gray-700 ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center">
                  {col.title}
                  {col.sortable && (
                    <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className={`transition hover:bg-gray-100 ${
                selectedRows.includes(row) ? "bg-blue-50" : ""
              }`}
              onClick={() => selectable && toggleRowSelection(row)}
            >
              {selectable && (
                <td className="px-4 py-2">
                  {selectedRows.includes(row) ? (
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400" />
                  )}
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-gray-700">
                  {row[col.dataIndex] !== undefined
                    ? String(row[col.dataIndex])
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
