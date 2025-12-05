import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, className, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            // apply dark theme defaults while preserving any custom className from props
            className={`bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-lg rounded-xl p-3 flex items-start gap-3 max-w-md ${className ?? ""}`}
          >
            {/* content */}
            <div className="flex-1 min-w-0">
              {title && <ToastTitle className="text-sm font-semibold text-neutral-100">{title}</ToastTitle>}

              {description && (
                <ToastDescription className="mt-1 text-sm text-neutral-300">
                  {description}
                </ToastDescription>
              )}
            </div>

            {/* optional action area (keeps whatever was passed in) */}
            {action ? <div className="ml-3 flex items-center">{action}</div> : null}

            {/* close button */}
            <ToastClose
              aria-label="Close"
              className="ml-3 inline-flex items-center justify-center rounded-md p-1 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-700"
            />
          </Toast>
        );
      })}

      {/* viewport positioned bottom-right with dark styling */}
      <ToastViewport className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-[340px] sm:w-[420px] p-2" />
    </ToastProvider>
  );
}

export default Toaster;
