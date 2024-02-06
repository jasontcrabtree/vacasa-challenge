import Link from "next/link";
import { Header } from "./Header";
import styles from '@/styles/repository-card.module.css'

const RepositoryCard = ({ title, subtitle, link, description }:
    {
        title: string,
        subtitle: string,
        link: string,
        description: string
    }) => {

    if (!title || !link) {
        return null
    }

    return (
        <li className={styles.card}>
            <Header level="h3">
                <Link className="text-large font-semibold" href={link}>
                    {title}
                </Link>
            </Header>
            {subtitle && (<p className="font-medium">{subtitle}</p>)}
            {description && (<p>{description}</p>)}
        </li>
    )
}

export default RepositoryCard;