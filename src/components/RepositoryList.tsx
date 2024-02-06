import { RepositoryItemType } from "@/types/types";
import RepositoryCard from "./RepositoryCard";

const RepositoryList = ({ items }: { items: Array<RepositoryItemType> }) => {
    return (
        <ul>

            {items.map((item: RepositoryItemType) => {
                return (
                    <RepositoryCard key={item.id} title={item.name} description={item.description} subtitle={item.full_name} link={item.html_url} />
                )
            })}
        </ul>
    )
}

export default RepositoryList;