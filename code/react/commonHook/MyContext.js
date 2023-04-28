const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light);
/*function App() {
    // 整个应用使用 ThemeContext.Provider 作为根组件
    return (
        // 使用 themes.dark 作为当前 Context
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}*/
function App() {
    // 使用 state 来保存 theme 从而可以动态修改
    const [theme, setTheme] = useState("light");
    // 切换 theme 的回调函数
    const toggleTheme = useCallback(() => {
        setTheme((theme) => (theme === "light" ? "dark" : "light"));
    }, []);
    return (
        // 使用 theme state 作为当前 Context
        <ThemeContext.Provider value={themes[theme]}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{
            background: theme.background,
            color: theme.foreground
        }}>
            I am styled by theme context!
        </button>
    );
}