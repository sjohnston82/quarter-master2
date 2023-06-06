export default function getWindowSize() {
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  return { innerWidth: 0, innerHeight: 0 }; // Default values when executed in a non-browser environment
}
