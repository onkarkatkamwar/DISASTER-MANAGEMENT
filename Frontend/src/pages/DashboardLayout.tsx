import React from 'react' 
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Bell, ChevronDown, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useBreadcrumb } from "@/context/BreaderCrumbContext";
import { Outlet } from "react-router-dom";
import gahinath from '@/assets/Gahinath.jpg';

export default function DashboardLayout() {
    const { items } = useBreadcrumb();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className=" top-0 py-2 px-10 border-b bg-white">
          <div className="w-full flex justify-between gap-2 px-4">
            <Breadcrumb className='flex items-center'>
                <BreadcrumbList>
                    {items.map((item, index) =>(
                        <React.Fragment key={item.url}>
                        <BreadcrumbItem className={index > 0 ? "hidden md:block" : ""}>
                            <BreadcrumbLink href={item.url} className='text-md font-semibold'>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4">
                {/* Notification Button with Badge */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full hover:bg-gray-100/50"
                >
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <Badge 
                    variant="destructive" 
                    className="absolute -right-1 -top-1 h-5 w-5 justify-center p-0"
                    >
                    3
                    </Badge>
                </Button>

                {/* User Profile with Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <Avatar className="h-8 w-8 border-2 border-primary group-hover:border-primary/80 transition-colors">
                            <AvatarImage src={gahinath} alt="Gahinath Madake" />
                            <AvatarFallback>GM</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col items-start">
                            <span className="font-medium text-sm">Gahinath Madake</span>
                            <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                <Mail className="h-3 w-3" />
                                <span>gahinathmadake@gmail.com</span>
                            </div>
                        </div>

                        <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
                    </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
