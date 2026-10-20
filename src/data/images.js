export const asset = {
  poster: (name) => new URL(`./images/${name}`, import.meta.url).href,
  banner: (name) => new URL(`./images/${name}`, import.meta.url).href,
  logo: (name) => new URL(`./images/${name}`, import.meta.url).href,
  cast: (name) => new URL(`./images/${name}`, import.meta.url).href,
};