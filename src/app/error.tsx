'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-black flex items-center justify-center gap-4 flex-col w-screen h-[calc(100vh_-_4rem)] text-white">
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
