import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { slugify, deslugify } from "@/lib/utils";

/**
 * Custom hook for redirecting and reverting URLs.
 */
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

  /**
   * Converts a URL object or string back to a string path.
   * If a string is provided, returns it as is.
   * If a URL object is provided, returns its pathname + search + hash.
   * @param link The URL or string to convert.
   */


  /**
   * Convert a readable title to a URL-safe slug.
   */
  const toSlug = useCallback((title: string) => slugify(title), []);

  /**
   * Convert a slug back to a readable Title Case string.
   */
  const fromSlug = useCallback((slug: string) => deslugify(slug), []);

  return { redirect, toSlug, fromSlug };
}
