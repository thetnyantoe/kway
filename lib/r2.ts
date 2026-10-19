//or custom domain in the future
export const R2_PUBLIC_DOMAIN =
  "https://pub-37cdc29158eb4b399d3544d0211772b1.r2.dev";
export const getPublicUrl = (key?: string | null) => {
  if (!key) return null;
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;
  return `${R2_PUBLIC_DOMAIN}/${cleanKey}`;
};
