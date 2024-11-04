import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error); // Log the error for debugging

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4"
    >
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg font-medium mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-gray-500">
        <i>{error?.statusText || error?.message || "Unknown error occurred"}</i>
      </p>
    </div>
  );
}
