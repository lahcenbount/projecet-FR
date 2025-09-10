// src/components/ui/table.jsx
export function Table({ children, className = "", ...props }) {
  return (
    <table className={`w-full border-collapse ${className}`} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead className={`${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = "", ...props }) {
  return (
    <tbody className={`${className}`} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr className={`border-b ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th
      className={`text-left px-4 py-2 bg-gray-100 font-semibold ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </td>
  );
}
