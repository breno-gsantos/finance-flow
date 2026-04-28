'use client'

import { ArrowLeftRight, LayoutDashboard, Tags, TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Transações", icon: ArrowLeftRight, href: "/transactions" },
  { title: "Categorias", icon: Tags, href: "/categories" },
]

export function AppSidebar(){
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-sidebar-border">
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-sidebar-foreground">FinanceFlow</span>
                        <span className="text-xs text-muted-foreground">Gestão Financeira</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map(({href, icon: Icon, title}) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton asChild isActive={pathname === href} className="transition-colors">
                                        <Link href={href}>
                                            <Icon className="size-4" />
                                            <span>{title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=finance" alt="Usuário" />
                        <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-sidebar-foreground">João Silva</span>
                        <span className="text-xs text-muted-foreground">Conta Premium</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}