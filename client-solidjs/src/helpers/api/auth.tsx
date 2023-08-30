import { z } from "zod";

const loginValueSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const registerValueSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  userName: z.string(),
});

const registerResponseSchema = z.object({
  userName: z.string(),
});

const UserSchema = z.object({
  userName: z.string(),
});

export type loginValue = z.infer<typeof loginValueSchema>;
export type loginResponse = z.infer<typeof loginResponseSchema>;
export type registerValue = z.infer<typeof registerValueSchema>;
export type registerResponse = z.infer<typeof registerResponseSchema>;
export type User = z.infer<typeof UserSchema>;

export async function login(requestBody: loginValue): Promise<loginResponse> {
  const res = await fetch("https://localhost:5001/api/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const resData = loginResponseSchema.safeParse(await res.json());

  if (!resData.success) {
    throw new Error("Invalid Response");
  }

  return resData.data;
}

export async function register(
  requestBody: registerValue
): Promise<registerResponse> {
  const res = await fetch("https://localhost:5001/api/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const resData = registerResponseSchema.safeParse(await res.json());

  if (!resData.success) {
    throw new Error("Invalid Response");
  }

  return resData.data;
}

export async function getUserInfo(): Promise<User> {
  const res = await fetch("https://localhost:5001/api/account/info", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(res.status.toString());
  }

  const resData = UserSchema.safeParse(await res.json());

  if (!resData.success) {
    throw new Error("Invalid Response");
  }

  return resData.data;
}

export async function logout(): Promise<void> {
  const res = await fetch("https://localhost:5001/api/account/logout", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(res.status.toString());
  }
}
