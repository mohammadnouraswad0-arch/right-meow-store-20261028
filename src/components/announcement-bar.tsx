export function AnnouncementBar({ message }: { message: string }) {
  return (
    <div
      className="w-full py-2 text-center text-xs font-semibold text-white sm:text-sm"
      style={{ backgroundColor: "var(--color-dark-brown)" }}
    >
      {message}
    </div>
  );
}
