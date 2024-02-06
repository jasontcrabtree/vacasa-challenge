import Link from "next/link";
import { Header } from "./Header";

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
        <li>
            <Header level="h3" classes="">
                <Link href={link}>
                    {title}
                </Link>
            </Header>
            {subtitle && (<p>{subtitle}</p>)}
            {description && (<p>{description}</p>)}
        </li>
    )
}

export default RepositoryCard;