import Image from "next/image";

const BannerCenter = ({src = "/mmoz/banner-1.png", href = "/", alt = "Banner Ads"}) => {
    return (
        <a href={href} className="w-full">
            <Image width={0} height={0} sizes="100vw" src={src} className="w-full" alt={alt} />
        </a>
    )
}
export default BannerCenter;