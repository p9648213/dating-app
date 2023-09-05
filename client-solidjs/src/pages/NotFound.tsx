import Button from "../components/Button";
import { useNavigate } from "@solidjs/router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div class="flex flex-col items-center justify-start gap-5  min-h-screen pt-10">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button theme="light" onClick={() => navigate("/", { replace: true })}>
        Return to home page
      </Button>
    </div>
  );
}

export default NotFound;
