"use client";

import { menuItems } from "@/data/menu-items";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSessionStore } from "@/stores/auth.store";
import HeaderUserSection from "./Header-User";
import { IconClose } from "../icons";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSessionStore(state => state.session)
  const pathname = usePathname()

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>منو</button>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`text-center fixed top-0 right-0 h-full w-72 bg-base-100 z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-b-white/40">
          <Image
            src="/images/Logo-light.svg"
            width={60}
            height={18}
            alt="کلاسبن"
          />
          <button onClick={closeMenu}>
            <IconClose/>
          </button>
        </div>

        <ul className="flex-col  p-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li className="mt-12" key={item.title}>
                <Link
                  className={`hover:text-primary text-base transition-colors pb-2 ${
                    isActive && "border-b-2 text-primary border-primary/30"
                  }`}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          <HeaderUserSection />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
