import useSWR from "swr";
export const API_BASE = import.meta.env.VITE_API_HOST;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useCompilations(id) {
  // get array or single Compilation
  console.log(`${API_BASE}/api/compilations/`);
  const { data, error } = useSWR(
    id ? `${API_BASE}/api/compilations/${id}` : `${API_BASE}/api/compilations/`,
    fetcher
  );

  console.log(data, error);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
