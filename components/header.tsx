'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps{
    title: string;
    subtitle?: string;
}

export function Header({title, subtitle}: HeaderProps){
    return(
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div>
                    <h1 className="text-lg font-semibold text-foreground md:text-xl">{title}</h1>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="w-64 bg-secondary pl-9" />
                </div>

                <Button variant='ghost' size='icon' className="relative">
                    <Bell className="size-5" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                        3
                    </span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hidden md:flex">
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="size-9">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=finance" alt="Usuário" />
                                <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">João Silva</p>
                                <p className="text-xs text-muted-foreground">joao@email.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Configurações</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}