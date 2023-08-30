import { z } from "zod";

const MemberSchema = z.object({
  id: z.number(),
  userName: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

export async function getMembers(): Promise<Member[]> {
  const res = await fetch("https://localhost:5001/api/users");

  if (!res.ok) {
    throw new Error(res.status.toString());
  }

  const resData = z.array(MemberSchema).safeParse(await res.json());

  if (!resData.success) {
    throw new Error("Invalid User Data");
  }

  return resData.data;
}
