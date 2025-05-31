import * as React from "react"
import {
  GalleryVerticalEnd,
  Laptop,
  Volume2,
  HelpCircle,
  Command,
  TriangleAlert,
  Contact2Icon,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"

const data = {
  user: {
    name: "Gahinath Madake",
    email: "gahinathmadake@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  Platform: {
    name: "Disaster Manager",
    logo: GalleryVerticalEnd,
    plan: "Public",
  },
  navMenu: [
    { 
      title: "Dashboard",
      url: "/dashboard",
      icon: Laptop,
    },
    { 
      title: "Disaster Events",
      url: "/dashboard/alerts",
      icon: Volume2,
    },
    {
      title: "Create Alert",
      url: "/dashboard/create-alert",
      icon: TriangleAlert,
    },
    {
      title: "Our Alert",
      url: "/dashboard/our-alerts",
      icon: Contact2Icon,
    },
    {
      title: "Help",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
    // {
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: Captions,
    //   isActive: false,
    //   items: [
    //     {
    //       title: "Ongoing",
    //       url: '/student/courses/ongoing'
    //     },
    //     {
    //       title: "Completed",
    //       url: '/student/courses/completed'
    //     },
    //     {
    //       title: "All",
    //       url: '/student/courses/All'
    //     },
    //   ],
    // },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings,
  //   },
  //   {
  //     title: "Help",
  //     url: "/dashboard/create-alert",
  //     icon: HelpCircle,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">

      <div className="relative">
        
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Disaster Manager</span>
                    <span className="truncate text-xs">Public</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </div>

      <SidebarContent>
        {/* Sidebar menu */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}

          <SidebarMenu>
            {data.navMenu.map((menu, index) => {
              // if (menu.items) {
              //   return <NavMain key={index} item={{ ...menu, icon: menu.icon }} />;
              // } else 
              {
                return <NavProjects key={index} projects={{ ...menu, icon: menu.icon }} />;
              }
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Navbar Second */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}

      <SidebarRail />
    </Sidebar>
  );
}

