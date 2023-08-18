import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  userName: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://localhost:5001/api/users");

  if (!res.ok) {
    throw new Error(res.status.toString());
  }

  const resData = z.array(UserSchema).safeParse(await res.json());

  if (!resData.success) {
    throw new Error("Invalid User Data");
  }

  return resData.data;
}
