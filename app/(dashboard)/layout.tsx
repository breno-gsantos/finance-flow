import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props{
    children: React.ReactNode;
}

export default function DashboardLayout({children}: Props){
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col">
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}