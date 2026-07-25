import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

type TrendIconProps = {
    title?: string;
    fileId?: string | null;
    className?: string;
};

const TrendIcon = ({ fileId, className }: TrendIconProps) => {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [fileId]);

    if (fileId && !imageFailed) {
        return (
            <img
                src={`${import.meta.env.VITE_BASE_API}/File/DownloadFile/${fileId}`}
                alt=""
                className={className}
                onError={() => setImageFailed(true)}
            />
        );
    }

    return <Zap aria-hidden="true" className={className} />;
};

export default TrendIcon;
