import {
  Accessor,
  createContext,
  createSignal,
  JSX,
  onMount,
  Setter,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { getUserInfo, User } from "../helpers/api/auth";

type UserContextProps = {
  user: User;
  setUser: SetStoreFunction<User>;
  loading: Accessor<boolean>;
  setLoading: Setter<boolean>;
};

export const UserContext = createContext<UserContextProps>();

export function UserContextProvider(props: { children: JSX.Element }) {
  const [user, setUser] = createStore<User>({ userName: "" });
  const [loading, setLoading] = createSignal<boolean>(true);

  onMount(async () => {
    if (!user.userName) {
      try {
        const user = await getUserInfo();
        setUser("userName", user.userName);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext)!;
