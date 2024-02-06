import RepositoryCard from "./RepositoryCard";

// @ts-expect-error
const RepositoryList = ({ items }) => {
    return (
        <ul>
            {/* @ts-expect-error */}
            {items.map((item, index) => {
                return (
                    <RepositoryCard key={item.id} />
                )
            })}
        </ul>
    )
}

export default RepositoryList;