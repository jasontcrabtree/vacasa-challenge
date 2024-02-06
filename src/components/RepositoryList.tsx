import RepositoryCard from "./RepositoryCard";

const RepositoryList = ({ items }) => {
    return (
        <ul>
            {items.map((item, index) => {
                return (
                    <RepositoryCard key={item.id} />
                )
            })}
        </ul>
    )
}

export default RepositoryList;