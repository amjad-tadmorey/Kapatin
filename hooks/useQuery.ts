// src/hooks/useQuery.ts
import { useState, useEffect, useCallback } from "react";

type ApiFn<T> = () => Promise<T>;

export function useQuery<T>(apiFn: ApiFn<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFn(); // expects the axios function to return the data directly
      setData(result.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
