import Button from "../components/Button";
import {
  ApiError,
  get400Error,
  get400ValidationError,
  get401Error,
  get404Error,
  get500Error,
} from "../helpers/api/test-error";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";

function TestError() {
  const navigate = useNavigate();

  async function catchError(res: Promise<any>) {
    try {
      await res;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 404) {
          navigate("/not-found");
        } else if (error.statusCode === 500) {
          navigate("/server-error", { state: error });
        } else {
          error.message.forEach((err) => {
            toast.error(err);
          });
        }
      } else {
        toast.error(error as string);
      }
    }
  }

  return (
    <div class="flex flex-col gap-5 p-5 items-center">
      <Button theme="light" onClick={() => catchError(get500Error())}>
        Test 500 Error
      </Button>
      <Button theme="light" onClick={() => catchError(get400Error())}>
        Test 400 Error
      </Button>
      <Button theme="light" onClick={() => catchError(get401Error())}>
        Test 401 Error
      </Button>
      <Button theme="light" onClick={() => catchError(get404Error())}>
        Test 404 Error
      </Button>
      <Button theme="light" onClick={() => catchError(get400ValidationError())}>
        Test 400 Validation Error
      </Button>
    </div>
  );
}

export default TestError;
