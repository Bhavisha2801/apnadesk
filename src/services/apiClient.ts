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
    const error = await response.json();

    throw new Error(
      error.message || "Something went wrong"
    );
  }

  if(response.status === 204) {
    return {} as T;
  }

  console.log(response, 'response');

  return response.json();
}