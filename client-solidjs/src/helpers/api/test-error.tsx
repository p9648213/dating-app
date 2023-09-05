export class ApiError {
  message: Array<string>;
  statusCode: number;
  details?: string;

  constructor(
    error: Array<string>,
    status: number,
    details?: string | undefined
  ) {
    this.message = error;
    this.statusCode = status;
    this.details = details;
  }
}

export async function get404Error() {
  const res = await fetch("https://localhost:5001/api/buggy/not-found");

  if (!res.ok) {
    await handleError(res);
  }

  return res.json();
}

export async function get400Error() {
  const res = await fetch("https://localhost:5001/api/buggy/bad-request");

  if (!res.ok) {
    await handleError(res);
  }

  return res.json();
}

export async function get500Error() {
  const res = await fetch("https://localhost:5001/api/buggy/server-error");

  if (!res.ok) {
    await handleError(res);
  }

  return res.json();
}

export async function get401Error() {
  const res = await fetch("https://localhost:5001/api/buggy/auth");

  if (!res.ok) {
    await handleError(res);
  }

  return res.json();
}

export async function get400ValidationError() {
  const res = await fetch("https://localhost:5001/api/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    await handleError(res);
  }

  return res.json();
}

export async function handleError(res: Response) {
  switch (res.status) {
    case 400:
      try {
        const error = await res.json();
        if (error.errors) {
          const modelStateError = [];
          for (const key in error.errors) {
            if (error.errors[key]) {
              modelStateError.push(error.errors[key]);
            }
          }
          throw modelStateError;
        }
      } catch (error) {
        if (Array.isArray(error)) {
          throw new ApiError(error, 400);
        } else {
          throw new ApiError(["400 Bad Request"], 400);
        }
      }

      break;

    case 401:
      throw new ApiError(["401 Unauthorised"], 401);
    case 404:
      throw new ApiError(["404 Not Found"], 404);
    case 500:
      const error = await res.json();
      throw new ApiError([error.message], 500, error.details);
    default:
      throw new Error("Something unexpected went wrong");
  }
}
