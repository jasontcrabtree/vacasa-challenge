import { ReactNode } from "react"

export const Header = ({
    children,
    level,
    classes
}: {
    children: ReactNode,
    level?: string,
    classes?: string
}) => {
    switch (level) {
        case "h1":
            return <h1 className={`${classes}`}>{children}</h1>
        case "h2":
            return <h2 className={`${classes}`}>{children}</h2>
        case "h3":
            return <h3 className={`${classes}`}>{children}</h3>
        default:
            return <h1 className={`${classes}`}>{children}</h1>
    }
}