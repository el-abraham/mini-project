export function ErrorLabel({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="text-sm text-red-500">{message}</div>;
}
