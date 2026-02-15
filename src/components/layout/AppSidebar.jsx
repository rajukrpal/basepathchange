import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Settings,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  User,
  MoreHorizontal,
  Calendar,
  MessageSquare
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const data = {
  user: {
    name: "Raju Pal",
    email: "raju@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: Calendar,
    },
    {
      title: "Messages",
      url: "/chat",
      icon: MessageSquare,
    },
  ],
  secondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900" {...props}>
      <SidebarHeader className="border-b border-gray-50 dark:border-gray-800/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link to="/dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-[#F97316] text-white shadow-lg shadow-orange-200 dark:shadow-none">
                  <Command className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-bold uppercase tracking-wider text-gray-900 dark:text-white">PMS System</span>
                  <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Workspace Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 hide-scrollbar scrollbar-none">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10.5px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2.5">
            Main
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {data.navMain.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                        "relative h-10 px-4 transition-all duration-300 group/item rounded-sm border",
                        isActive 
                            ? "!bg-[#F97316]/15 border-[#F97316]/20 dark:border-[#F97316]/30 !text-[#F97316] font-bold shadow-sm" 
                            : "bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:text-[#F97316] hover:bg-[#F97316]/5 dark:hover:bg-white/5"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      {item.icon && (
                        <item.icon className={cn(
                            "size-4.5 transition-all duration-300",
                            isActive ? "text-[#F97316] scale-110" : "text-gray-400 group-hover/item:text-[#F97316] group-hover/item:scale-105"
                        )} />
                      )}
                      <span className="text-[13.5px] tracking-tight">{item.title}</span>
                      
                      {isActive && (
                        <div className="absolute right-3 h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto pb-6">
          <SidebarGroupLabel className="px-4 text-[10.5px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-2.5">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {data.secondary.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      size="sm"
                      isActive={isActive}
                      className={cn(
                        "relative h-9 px-4 transition-all duration-300 group/item rounded-sm border",
                        isActive 
                          ? "bg-[#F97316]/15 border-[#F97316]/20 dark:border-[#F97316]/30 text-[#F97316] font-bold shadow-sm" 
                          : "bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:text-[#F97316] hover:bg-[#F97316]/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className={cn(
                            "size-4 transition-all duration-300",
                            isActive ? "text-[#F97316] scale-110" : "text-gray-400 group-hover/item:text-[#F97316] group-hover/item:scale-105"
                        )} />
                        <span className="text-[13px] tracking-tight">{item.title}</span>
                        
                        {isActive && (
                          <div className="absolute right-3 h-1 w-1 rounded-full bg-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">RP</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold dark:text-white">{data.user.name}</span>
                    <span className="truncate text-xs dark:text-gray-400">{data.user.email}</span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-40 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate("/login");
                  }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

