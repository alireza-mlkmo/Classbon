import React from "react";
import Image from "next/image";
import { TopNavigation } from "./Top-navigation";
import HeaderUserSection from "./Header-User";
import MobileMenu from "./MobileMenu";

export const Header: React.FC = () => {
    return (
      <header className="border-b border-base-content/5 ">
        <div className="container mx-auto flex items-center justify-between">
          <MobileMenu/>
          <Image src="/images/Logo-light.svg" width={100} height={36} alt="کلاسبن"/>
          <TopNavigation/>
          <div className="hidden md:block mr-auto">
            <HeaderUserSection/>
          </div>
          <div className="w-10 h-10 block md:hidden">

          </div>
        </div>
      </header>
    );
}