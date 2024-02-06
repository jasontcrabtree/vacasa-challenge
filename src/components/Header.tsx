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
    const H1Heading = () => {
        return (
            <h1 className={`${classes ? classes : ""} text-uppercase font-medium`}>{children}</h1>
        )
    }

    switch (level) {
        case "h1":
            return <H1Heading />
        case "h2":
            return <h2 className={`${classes ? classes : ""}`}>{children}</h2>
        case "h3":
            return <h3 className={`${classes ? classes : ""}`}>{children}</h3>
        default:
            return <H1Heading />
    }
}