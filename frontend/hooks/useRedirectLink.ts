import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useRedirectLink() {
  const router = useRouter();

  /**
   * Redirects to the given URL.
   * @param url The URL or path to redirect to.
   */
  const redirect = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );

  return redirect;
}
