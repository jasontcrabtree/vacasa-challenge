import Link from "next/link"

const AppNav = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Repositories
                    </Link>
                </li>
                <li>
                    <Link href="/settings">
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav;