import Image from "@/components/Image"
import { ICONS, LOGIN_ASSETS } from "@/constant/image"

export const Header = () => {
    return (
        <header className="w-full flex absolute top-0 justify-between">
             <Image path={LOGIN_ASSETS.kareraLogo.src} alt="kareraLogo" className="w-[370px] h-[84px]"/>
             <Image path={ICONS.hamburger.src} alt="" className="w-[70px] h-[70px]"/>
        </header>
    )
}
