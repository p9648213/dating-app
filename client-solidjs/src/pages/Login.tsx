import { createStore } from "solid-js/store";
import { z } from "zod";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { login } from "../helpers/api/auth";
import { useUserContext } from "../context/User";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

const LoginFormSchema = z.object({
  username: z.object({
    value: z.string().nonempty("Username can not be empty"),
    error: z.string(),
  }),
  password: z.object({
    value: z.string().min(6, "Password must contain at least 6 character(s)"),
    error: z.string(),
  }),
});

type LoginFormValue = z.infer<typeof LoginFormSchema>;

const initialFormValue = {
  username: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
};

function Login() {
  const [loginFormInput, setLoginFormInput] =
    createStore<LoginFormValue>(initialFormValue);

  const { user, setUser, loading, setLoading } = useUserContext();

  const navigate = useNavigate();

  createEffect(() => {
    if (user.userName) {
      return navigate("/", { replace: true });
    }
  });

  function handleInputChange(inputName: string, inputValue: string) {
    switch (inputName) {
      case "username":
        setLoginFormInput("username", "value", inputValue);
        break;
      case "password":
        setLoginFormInput("password", "value", inputValue);
        break;
      default:
        break;
    }
  }

  function clearForm() {
    Object.keys(loginFormInput).map((key) => {
      setLoginFormInput(key as "username" | "password", "value", "");
      setLoginFormInput(key as "username" | "password", "error", "");
    });
  }

  function clearError(inputName: string) {
    setLoginFormInput(inputName as "username" | "password", "error", "");
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = LoginFormSchema.safeParse(loginFormInput);

    if (!formData.success) {
      return formData.error.errors.forEach((error) => {
        setLoginFormInput(
          error.path[0].toString() as "username" | "password",
          "error",
          error.message
        );
      });
    }

    try {
      setLoading(true);
      const res = await login({
        username: formData.data.username.value,
        password: formData.data.password.value,
      });

      setUser("userName", res.userName);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }

    clearForm();
  }

  return (
    <>
      {!user.userName && !loading() && (
        <main class="flex items-center justify-center px-8 py-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div class="max-w-xl lg:max-w-3xl p-10 rounded-lg shadow-sm shadow-stone-400 bg-white">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Login
            </h1>

            <p class="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <form
              action="#"
              class="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div class="col-span-6">
                <FormInput
                  label="Username"
                  type="text"
                  id="username"
                  value={loginFormInput.username.value}
                  error={loginFormInput.username.error}
                  onChange={handleInputChange}
                  onFocus={clearError}
                />
              </div>

              <div class="col-span-6">
                <FormInput
                  label="Password"
                  type="password"
                  id="password"
                  value={loginFormInput.password.value}
                  error={loginFormInput.password.error}
                  onChange={handleInputChange}
                  onFocus={clearError}
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4 justify-between">
                <Button theme="dark" disable={loading()}>
                  {loading() ? "Loading" : "Sign in"}
                </Button>

                <div class="mt-4 text-sm text-gray-500 sm:mt-0">
                  <span>No account? Sign up now!</span>
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default Login;
