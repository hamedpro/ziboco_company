import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AsyncImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    fallback: string;
}

export const AsyncImageWithFallback: React.FC<AsyncImageProps> = ({
    src,
    fallback,
    alt,
    ...rest
}) => {
    const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Return early if src is falsy
        if (!src) {
            setHasError(true);
            setIsLoading(false);
            return;
        }

        // console.log("Fetching image from:", src);
        fetch(src)
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.blob();
            })
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                setImageBlobUrl(blobUrl);
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            });

        return () => {
            if (imageBlobUrl) {
                URL.revokeObjectURL(imageBlobUrl);
            }
        };
    }, [src]);

    if (isLoading) {
        return (
            <div {...rest}>
                <Skeleton className="w-full h-full bg-muted" />
            </div>
        );
    }

    if (hasError || !imageBlobUrl) {
        return <img src={fallback} alt={alt} {...rest} />;
    }

    return <img
        src={imageBlobUrl}
        alt={alt}
        onError={(error) => {
            setHasError(true)
        }}
        {...rest}
    />;
};
