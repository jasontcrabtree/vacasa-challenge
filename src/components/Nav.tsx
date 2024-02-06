import Link from "next/link"
import styles from '@/styles/nav.module.css'
import { useRouter } from "next/router"

const AppNav = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li>
                    <Link href="/" className={router.pathname === "/" ? styles.active : ''}>
                        Repositories
                    </Link>
                </li>
                <li>
                    <Link href="/settings" className={router.pathname === "/settings" ? styles.active : ''}>
                        Settings
                    </Link>
                </li>
                <p className="ml-auto">
                    <span className="font-semibold">
                        Engineer Challenge:{' '}
                    </span>
                    Jason Crabtree Submission
                </p>
            </ul>
        </nav>
    )
}

export default AppNav;