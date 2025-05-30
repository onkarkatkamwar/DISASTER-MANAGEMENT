import { type LucideIcon } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavProjects({
  projects,
}: {
  projects: {
    title: string;
    url: string;
    icon: LucideIcon;
  };
}) {
  const location = useLocation();
  const isActive = location.pathname === projects.url;

  return (
    <SidebarMenuItem key={projects.title}>
      <SidebarMenuButton asChild>
        <Link
          to={projects.url}
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-blue-100 text-blue-500"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <projects.icon className={isActive ? "text-blue-500" : "text-muted-foreground"} />
          <span>{projects.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
