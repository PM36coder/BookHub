import { useNavigate, useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  if (error.status === 404) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-100">
        <figure className="mb-6">
          <img
            src="https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif"
            alt="404 Page Not Found"
            className="w-full max-w-md mx-auto"
          />
        </figure>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-gray-100 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        The page you are looking for does not exist.
      </h1>
    </div>
  );
};
