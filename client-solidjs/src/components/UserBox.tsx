import { createSignal, onCleanup, onMount } from "solid-js";
import { User, logout } from "../helpers/api/auth";
import { IoLogOutOutline } from "solid-icons/io";
import toast from "solid-toast";
import { useUserContext } from "../context/User";

type UserBoxProps = {
  user: User;
};

function UserBox(props: UserBoxProps) {
  const [dropdownActive, setDropdownActive] = createSignal(false);
  const { setUser } = useUserContext();
  let userBoxRef: HTMLDivElement | undefined;

  async function handleLogout() {
    try {
      await logout();
      setUser("userName", "");
      toast.success("Log out successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  function handleToggleDropdown() {
    setDropdownActive((prev) => !prev);
  }

  onMount(() => {
    function checkDropdown(event: MouseEvent) {
      if (
        !userBoxRef?.contains(event.target as HTMLElement) &&
        dropdownActive()
      ) {
        setDropdownActive(false);
      }
    }

    document.addEventListener("click", checkDropdown);

    onCleanup(() => document.removeEventListener("click", checkDropdown));
  });

  return (
    <div class="relative" ref={userBoxRef}>
      <div class="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <div class="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          Welcome {props.user.userName}
        </div>

        <button
          class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          onClick={handleToggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
        classList={{ hidden: !dropdownActive() }}
        role="menu"
      >
        <div class="p-2">
          <div
            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
            role="menuitem"
          >
            Edit Profile
          </div>
        </div>

        <div class="p-2">
          <button
            type="submit"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            role="menuitem"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={22} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
