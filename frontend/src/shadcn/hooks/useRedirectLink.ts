import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { slugify, deslugify } from "@/lib/utils";

/**
 * Custom hook for redirecting and reverting URLs, and extracting id/title from slugs.
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
   * Convert an id and title to a URL-safe slug in the format: {id}-{slugified-title}
   * @param id The numeric id
   * @param title The title string
   */
  const toSlug = useCallback((id: number | undefined, title: string) => {
    return `${id}-${slugify(title)}`;
  }, []);

  /**
   * Extracts the id and title from a slug in the format: {id}-{slugified-title}
   * Returns an object: { id: number, title: string }
   * @param slug The slug string
   */
  const fromSlug = useCallback((slug: string) => {
    // Find the first hyphen, everything before is id, after is slugified title
    const firstHyphen = slug.indexOf("-");
    if (firstHyphen === -1) {
      return { id: null, title: deslugify(slug) };
    }
    const idPart = slug.slice(0, firstHyphen);
    const titlePart = slug.slice(firstHyphen + 1);
    const id = Number(idPart);
    const title = deslugify(titlePart);
    return { id: isNaN(id) ? null : id, title };
  }, []);

  return { redirect, toSlug, fromSlug };
}
