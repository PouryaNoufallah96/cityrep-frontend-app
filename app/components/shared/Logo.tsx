type Props = {
    className?: string;
}
const Logo = ({className}: Props) => {
    return (
        <div className={`flex items-center justify-center flex-col ${className}`}>
            <img src="/images/logo.svg" alt="CITYREP" className={""}/>
        </div>

    )
}

export default Logo