import { useNavigate } from "@solidjs/router";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useUserContext } from "../context/User";
import { createEffect } from "solid-js";
import { z } from "zod";
import { createStore } from "solid-js/store";
import { register } from "../helpers/api/auth";
import toast from "solid-toast";

const RegisterFormSchema = z.object({
  username: z.object({
    value: z.string().nonempty("Username can not be empty"),
    error: z.string(),
  }),
  password: z.object({
    value: z.string().min(6, "Password must contain at least 6 character(s)"),
    error: z.string(),
  }),
});

type RegisterFormValue = z.infer<typeof RegisterFormSchema>;

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

function Register() {
  const [registerFormInput, setRegisterFormInput] =
    createStore<RegisterFormValue>(initialFormValue);
  const { user, loading, setLoading, setUser } = useUserContext();
  const navigate = useNavigate();

  function handleInputChange(inputName: string, inputValue: string) {
    switch (inputName) {
      case "username":
        setRegisterFormInput("username", "value", inputValue);
        break;
      case "password":
        setRegisterFormInput("password", "value", inputValue);
        break;
      default:
        break;
    }
  }

  function clearForm() {
    Object.keys(registerFormInput).map((key) => {
      setRegisterFormInput(key as "username" | "password", "value", "");
      setRegisterFormInput(key as "username" | "password", "error", "");
    });
  }

  function clearError(inputName: string) {
    setRegisterFormInput(inputName as "username" | "password", "error", "");
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const formData = RegisterFormSchema.safeParse(registerFormInput);

    if (!formData.success) {
      return formData.error.errors.forEach((error) => {
        setRegisterFormInput(
          error.path[0].toString() as "username" | "password",
          "error",
          error.message
        );
      });
    }

    try {
      setLoading(true);
      const res = await register({
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

  createEffect(() => {
    if (user.userName) {
      return navigate("/", { replace: true });
    }
  });

  return (
    <>
      {!user.userName && !loading() && (
        <main class="flex items-center justify-center px-8 py-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div class="max-w-xl lg:max-w-3xl p-10 rounded-lg shadow-sm shadow-stone-400 bg-white">
            <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Register
            </h1>

            <p class="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form class="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
              <div class="col-span-6 sm:col-span-3">
                <FormInput
                  label="Username"
                  type="text"
                  id="username"
                  value={registerFormInput.username.value}
                  error={registerFormInput.username.error}
                  onChange={handleInputChange}
                  onFocus={clearError}
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <FormInput
                  label="Password"
                  type="password"
                  id="password"
                  value={registerFormInput.password.value}
                  error={registerFormInput.password.error}
                  onChange={handleInputChange}
                  onFocus={clearError}
                />
              </div>

              <div class="col-span-6 sm:flex sm:items-center sm:gap-4 justify-between">
                <Button theme="dark" disable={loading()}>
                  {loading() ? "Loading" : "Create an account"}
                </Button>

                <div class="mt-4 text-sm text-gray-500 sm:mt-0">
                  <span>Already have an account? Log in.</span>
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default Register;
