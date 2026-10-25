// Resolves a file inside /public so it works on any host or sub-folder.
export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`
