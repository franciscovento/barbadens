'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="">
      <h2>Ocurrió un error, por favor inténtalo nuevamente</h2>
      <button
        className="bg-app-secondary text-app-primary p-2"
        onClick={() => reset()}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
