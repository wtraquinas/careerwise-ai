import AppRouter from "./app/router/AppRouter";


export default function App({
    darkMode,
    toggleTheme,
}) {

    return (
        <AppRouter
            darkMode={darkMode}
            toggleTheme={toggleTheme}
        />
    );
}
