export function Card({ children, className = "", ...props }) {
  return (
    <div className={`border rounded shadow p-4 bg-white ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-2 font-semibold text-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`text-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-xl font-bold mb-2 ${className}`} {...props}>
      {children}
    </h2>
  );
}

// Ajout de CardDescription
export function CardDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-sm text-gray-500 mb-4 ${className}`} {...props}>
      {children}
    </p>
  );
}

// Ajout de CardFooter
export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`mt-4 border-t pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
