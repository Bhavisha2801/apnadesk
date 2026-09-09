interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({
  message = "Loading...",
  fullPage = false,
}: LoadingStateProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-center
        gap-3
        text-sm
        text-gray-500
        ${fullPage ? "min-h-[400px]" : "py-12"}
      `}
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
        aria-hidden="true"
      />

      <span>{message}</span>
    </div>
  );
}