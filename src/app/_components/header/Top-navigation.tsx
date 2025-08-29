'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { menuItems } from "@/data/menu-items";

export const TopNavigation: React.FC = () => {
    const pathname = usePathname()
    return (
        <ul className="hidden md:flex gap-x-8 mr-12">
            {menuItems.map(item => {
                const isActive = pathname === item.href;
                return <li key={item.title}><Link className={`hover:text-primary text-base transition-colors pb-2 ${isActive && 'border-b-2 text-primary border-primary/30'}`} href={item.href}>{item.title}</Link></li>
            })}            
        </ul>
    )
}