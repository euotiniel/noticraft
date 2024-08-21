import Link from "next/link";

export default function page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="font-semibold text-3xl leading-7 text-neutral-800 dark:text-neutral-300 [&:not(:first-child)]:mt-6">
        404
      </p>
    </div>
  );
}
