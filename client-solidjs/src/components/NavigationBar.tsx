import LinkButton from "./LinkButton";
import { A } from "@solidjs/router";
import { useUserContext } from "../context/User";
import UserBox from "./UserBox";

function NavigationBar() {
  const { user, loading } = useUserContext();

  return (
    <header class="px-5 border-b border-b-stone-300 bg-white">
      <div
        class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center"
        classList={{ "justify-between": user.userName === "" }}
      >
        <A href="/">
          <div class="flex font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Tailblocks</span>
          </div>
        </A>

        {user.userName && (
          <>
            <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center">
              <LinkButton href="/matches" active="text-rose-700">
                Matches
              </LinkButton>

              <LinkButton href="/list" active="text-rose-700">
                List
              </LinkButton>

              <LinkButton href="/message" active="text-rose-700">
                Message
              </LinkButton>

              <LinkButton href="/errors" active="text-rose-700">
                Error
              </LinkButton>
            </nav>
          </>
        )}

        {!user.userName && !loading() && (
          <>
            <div>
              <LinkButton href="/login" active="text-rose-700">
                Login
              </LinkButton>

              <LinkButton href="/register" active="text-rose-700">
                Register
              </LinkButton>
            </div>
          </>
        )}

        {user.userName && <UserBox user={user} />}
      </div>
    </header>
  );
}

export default NavigationBar;
