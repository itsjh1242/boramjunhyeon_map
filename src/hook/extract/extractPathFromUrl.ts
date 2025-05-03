const extractPathFromUrl = (url: string): string | null => {
  try {
    const start = url.indexOf("/o/") + 3;
    const end = url.indexOf("?");
    const encodedPath = url.slice(start, end);
    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
};

export default extractPathFromUrl;
