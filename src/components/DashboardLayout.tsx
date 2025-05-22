import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LayoutDashboard,
  TrendingUp,
  Utensils,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import GlobalFilters from "./GlobalFilters";
import AiInsightsPanel from "./AiInsightsPanel";
import DashboardContent from "./DashboardContent";
import { motion } from "framer-motion";

export type DashboardTab = "sales" | "menu" | "operations" | "survey";

export interface FilterState {
  dateRange: { from: Date; to: Date };
  restaurant: string;
  mealPeriod: string;
  menuCategory: string[];
}

interface DashboardLayoutProps {
  initialTab?: DashboardTab;
}

const DashboardLayout = ({ initialTab = "sales" }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
    restaurant: "All Locations",
    mealPeriod: "All Periods",
    menuCategory: [],
  });

  const [insightsCollapsed, setInsightsCollapsed] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const dashboardTitles = {
    sales: "Sales Analysis",
    menu: "Menu Analysis",
    operations: "Restaurant Operations",
    survey: "Guest Survey Analysis",
  };

  const dashboardIcons = {
    sales: <TrendingUp size={20} />,
    menu: <Utensils size={20} />,
    operations: <BarChart3 size={20} />,
    survey: <MessageSquare size={20} />,
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarCollapsed ? 64 : 256 }}
        animate={{ width: sidebarCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-card border-r border-border/30 shadow-sm flex flex-col z-10`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border/30">
          {!sidebarCollapsed && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              F&B Analytics
            </motion.h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-full hover:bg-accent/80 transition-colors duration-200"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-4">
            {Object.entries(dashboardTitles).map(([key, title]) => (
              <li key={key}>
                <button
                  onClick={() => setActiveTab(key as DashboardTab)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    activeTab === key
                      ? "bg-primary/10 text-primary shadow-sm border-l-4 border-primary"
                      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {dashboardIcons[key as DashboardTab]}
                  </span>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3 font-medium"
                    >
                      {title}
                    </motion.span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border/30 text-center">
          {!sidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => (window.location.href = "/login")}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
              <div className="text-xs text-muted-foreground">
                Dashboard v1.0
              </div>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="w-full"
              onClick={() => (window.location.href = "/login")}
            >
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background/50">
        {/* Header with filters */}
        <header className="bg-card/80 border-b border-border/30 shadow-sm sticky top-0 z-10">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-md bg-primary/10 text-primary">
                {dashboardIcons[activeTab]}
              </span>
              <h1 className="text-2xl font-semibold tracking-tight">
                {dashboardTitles[activeTab]}
              </h1>
            </div>
          </div>
          <GlobalFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6 bg-background/50">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <AiInsightsPanel
              dashboardType={activeTab}
              filters={filters}
              isLoading={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <DashboardContent dashboardType={activeTab} filters={filters} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
