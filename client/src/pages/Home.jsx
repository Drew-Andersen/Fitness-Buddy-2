import Dashboard from "./Dashboard";
import Logo from '../..//public/fitness_buddy-logo.png'

export default function Home() {
    return (
        <>
            <a href="https://react.dev" target="_blank">
                <img src={Logo} className="logo react" alt="React logo" />
            </a>
            <Dashboard />
        </>
    )
}