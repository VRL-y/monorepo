import { type ContentEntryMap, getCollection } from "astro:content";
import { type Locale, defaultLocale } from "site.config";

export async function getCollectionStaticPaths<
  CollectionName extends keyof ContentEntryMap,
>(
  collectionName: CollectionName,
  locale?: Locale,
): Promise<PathParams<CollectionName>[]> {
  const collection = await getCollection(collectionName);

  const visibleItems = collection.filter((item) => {
    return !item.data.hidden;
  });

  const paths = visibleItems.map((item) => {
    const [lang, ...slug] = item.slug.split("/");
    let localizedSlug = slug;

    if (collectionName === "pages") {
      // For pages handle homepage slug
      localizedSlug = slug[0] === "homepage" || slug[0] === "index" ? [] : slug;
    }

    if (lang !== defaultLocale && !locale) {
      localizedSlug = [lang, ...localizedSlug];
    }

    return {
      params: {
        lang,
        slug: localizedSlug.join("/") || undefined,
      },
      props: {
        data: item,
      },
    };
  });

  let pathsRes = paths;
  if (locale) {
    pathsRes = paths.filter((path) => path.params.lang === locale);
  }

  return pathsRes;
}
