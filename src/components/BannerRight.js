import Image from "next/image";

const BannerRight = ({src = "/dumuc/install-app.jpeg", href = "/", alt = "Banner Ads", isAppInstall = false, top=20}) => {
    return (
        <div className="banner-right banner-display-right" style={{
            top: top
        }}>
            {/* {isAppInstall && (
                <a href="#"><Image width={0} height={0} sizes="100vw" src="/dumuc/appstore.gif" style={{ width: 280 }} alt="Appstore" /></a>
            )} */}
            <div className="mt-2">
                <a href={href}>
                    <Image width={0} height={0} sizes="100vw" className="rounded-md" src="/images/banner-right.jpg" style={{ width: 280 }} alt={alt} />
                </a>
            </div>
        </div>
    )
}
export default BannerRight;