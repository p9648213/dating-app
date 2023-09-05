import { useLocation, useNavigate } from "@solidjs/router";
import { ApiError } from "../helpers/api/test-error";

function ServerError() {
  const { state: error } = useLocation<ApiError>();
  const navigate = useNavigate();

  if (!error) {
    return navigate("/");
  }

  return (
    <div class="p-8 rounded-lg shadow-md">
      <h1 class="text-3xl text-red-800 mb-4">Internal server error</h1>
      <h2 class="text-xl text-red-600 mb-2">Error: {error.message}</h2>
      <p class="text-gray-600 mb-4">
        Note: If you are seeing this, then the front end is probably not to
        blame
      </p>
      <p class="text-lg font-semibold">What to do next?</p>
      <ol class="list-decimal list-inside ml-4 mb-4">
        <li class="mb-2">
          Open Chrome Dev Tools! Then check the failing request in the network
          tab
        </li>
        <li class="mb-2">
          Examine the request URL - what API endpoint are you requesting?
        </li>
        <li class="mb-2">
          Reproduce the problem in Postman - if we get the same error, the front
          end is 100% not the problem
        </li>
      </ol>
      <p class="text-lg font-semibold">
        Following is the stack trace - the first few lines will tell you which
        line of code caused the issue in the API
      </p>
      <code class="block bg-gray-200 p-4 rounded-lg mt-4">{error.details}</code>
    </div>
  );
}

export default ServerError;
