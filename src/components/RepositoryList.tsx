import { RepositoryItemType } from "@/types/types";
import RepositoryCard from "./RepositoryCard";
import styles from '@/styles/repository-list.module.css'

const RepositoryList = ({ items }: { items: Array<RepositoryItemType> }) => {
    return (
        <ul className={styles.grid}>
            {items.map((item: RepositoryItemType) => {
                return (
                    <RepositoryCard key={item.id} title={item.name} description={item.description} subtitle={item.full_name} link={item.html_url} />
                )
            })}
        </ul>
    )
}

export default RepositoryList;