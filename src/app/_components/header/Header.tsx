import React from "react";
import Image from "next/image";
import { TopNavigation } from "./Top-navigation";

export const Header: React.FC = () => {
    return (
      <header className="border-b border-base-content/5 ">
        <div className="container mx-auto flex items-center justify-between">
          <Image src="/images/Logo-light.svg" width={100} height={36} alt="کلاسبن"/>
          <TopNavigation/>
          <span className="mr-auto">Auth</span>
        </div>
      </header>
    );
}