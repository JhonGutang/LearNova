import { toast } from "sonner";

type CustomToastProps = {
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  description?: string;
  onClose?: () => void;
};

/**
 * Shows a custom toast using sonner.
 * Usage: CustomToast({ type, title, description, onClose });
 */
export function CustomToast({
  type = "info",
  title,
  description,
  onClose,
}: CustomToastProps) {
  // Define color classes for each toast type
  const colorClasses: Record<string, string> = {
    success: "border-l-4 border-green-500 bg-green-50 text-green-900",
    error: "border-l-4 border-red-500 bg-red-50 text-red-900",
    warning: "border-l-4 border-yellow-500 bg-yellow-50 text-yellow-900",
    info: "border-l-4 border-blue-500 bg-blue-50 text-blue-900",
  };

  // Fallback to info if type is not recognized
  const toastClass = colorClasses[type] || colorClasses.info;

  // Helper to get the main message for the toast
  const getMessage = () => {
    // Prefer title, fallback to description, fallback to empty string
    return title ?? description ?? "";
  };

  // Map type to sonner's toast function, always apply color class
  const showToast = () => {
    const message = getMessage();
    const options = {
      description: title ? description : undefined, // If title is present, description is secondary
      onAutoClose: onClose,
      onDismiss: onClose,
      className: toastClass,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warning
          ? toast.warning(message, options)
          : toast(message, options);
        break;
      case "info":
      default:
        toast.info
          ? toast.info(message, options)
          : toast(message, options);
        break;
    }
  };

  showToast();
  return null;
}
