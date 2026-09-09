export async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {

  const response = await fetch(
    `/api${url}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    }
  );

  if (!response.ok) {

    const contentType =
      response.headers.get(
        "content-type"
      );

    let message =
      `Request failed with status ${response.status}`;

    if (
      contentType?.includes(
        "application/json"
      )
    ) {
      const error =
        await response.json();

      message =
        error.message ||
        message;
    } else {
      const text =
        await response.text();

      console.error(
        "Non-JSON API response:",
        text
      );
    }

    throw new Error(message);
  }

  // DELETE 204
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}