export const useSelectedPath = () => {
  const [selectedPath, setSelectedPath] = useState(window.location.pathname);
  useEffect(() => {
    window.addEventListener("popstate", () => {
      setSelectedPath(window.location.pathname);
    });
  }, []);
  return selectedPath;
};
