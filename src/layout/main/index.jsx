import * as React from "react"
import { AppSidebar } from "@/components/layout/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Search, Bell } from "lucide-react"
import { useLocation, Outlet } from "react-router-dom"

export default function Layout() {
  const location = useLocation()
  
  // Simple mapping for breadcrumbs
  const pathnames = location.pathname.split('/').filter(x => x)
  const pageName = pathnames.length > 0 
    ? pathnames[pathnames.length - 1].charAt(0).toUpperCase() + pathnames[pathnames.length - 1].slice(1)
    : "Dashboard"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="dark:bg-gray-950 min-w-0">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 dark:text-gray-400" />
            <Separator orientation="vertical" className="mr-2 h-4 dark:bg-gray-800" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="dark:text-gray-400">
                    PMS System
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block dark:text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="dark:text-white">{pageName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                    type="search" 
                    placeholder="Search projects..." 
                    className="h-9 w-64 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 pl-9 text-sm focus:border-[#F97316] focus:outline-none transition-all dark:text-white dark:placeholder:text-gray-500"
                />
            </div>
            <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F97316]"></span>
            </button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 bg-gray-50/30 dark:bg-gray-950">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

