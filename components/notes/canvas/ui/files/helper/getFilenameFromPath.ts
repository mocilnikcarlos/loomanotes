export function getFilenameFromPath(path?: string, src?: string) {
  if (path) {
    return path.split("/").pop();
  }

  if (src) {
    try {
      const url = new URL(src);
      return url.pathname.split("/").pop();
    } catch {
      return null;
    }
  }

  return null;
}
