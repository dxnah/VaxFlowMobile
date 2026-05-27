import BASE_URL from "./api";

export function useAuthFetch() {
  return async (path: string, options: RequestInit = {}): Promise<any> => {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) ?? {}),
      },
    });

    if (!response.ok) {
      let msg = `HTTP ${response.status}`;
      try {
        const body = await response.json();
        msg = body.detail || body.error || msg;
      } catch (_) {}
      throw new Error(msg);
    }

    return response.json();
  };
}
