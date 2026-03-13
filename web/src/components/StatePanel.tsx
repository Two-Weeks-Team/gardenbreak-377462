"use client";

export default function StatePanel({ state }: { state: "loading" | "empty" | "error" | "success" }) {
  const messages: Record<string, string> = {
    loading: "Loading…",
    empty: "Nothing here yet.",
    error: "Oops, something went wrong.",
    success: "All set!"
  };
  const colors: Record<string, string> = {
    loading: "text-muted",
    empty: "text-muted",
    error: "text-red-500",
    success: "text-green-600"
  };
  return <div className={`p-4 ${colors[state]}`}>{messages[state]}</div>;
}
