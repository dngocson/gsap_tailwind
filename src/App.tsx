import Greeting from "./component/intro/Greeting";

function App() {
  // const [theme, setTheme] = useState<"light" | "dark">(() => {
  //   const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;
  //   return savedTheme || (prefersDark ? "dark" : "light");
  // });

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", theme === "dark");
  // }, [theme]);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  //   localStorage.setItem("theme", newTheme);
  // };

  return (
    <div className="bg-primary-100 relative h-full min-h-screen w-full transition-colors duration-300">
      <Greeting />
      {/* <Test /> */}
    </div>
  );
}

export default App;
