import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  LayoutDashboard,
  TrendingUp,
  Utensils,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import GlobalFilters from "./GlobalFilters";
import AiInsightsPanel from "./AiInsightsPanel";
import DashboardContent from "./DashboardContent";

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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!sidebarCollapsed && (
            <h2 className="text-xl font-bold">F&B Analytics</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-2">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("sales")}
                className={`w-full flex items-center p-2 rounded-md ${activeTab === "sales" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              >
                <TrendingUp size={20} />
                {!sidebarCollapsed && (
                  <span className="ml-3">Sales Analysis</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("menu")}
                className={`w-full flex items-center p-2 rounded-md ${activeTab === "menu" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              >
                <Utensils size={20} />
                {!sidebarCollapsed && (
                  <span className="ml-3">Menu Analysis</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("operations")}
                className={`w-full flex items-center p-2 rounded-md ${activeTab === "operations" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              >
                <BarChart3 size={20} />
                {!sidebarCollapsed && <span className="ml-3">Operations</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("survey")}
                className={`w-full flex items-center p-2 rounded-md ${activeTab === "survey" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              >
                <MessageSquare size={20} />
                {!sidebarCollapsed && (
                  <span className="ml-3">Guest Survey</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with filters */}
        <header className="bg-card border-b border-border">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{dashboardTitles[activeTab]}</h1>
          </div>
          <GlobalFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4">
          <Card className="mb-4">
            <AiInsightsPanel
              dashboardType={activeTab}
              filters={filters}
              isLoading={false}
            />
          </Card>

          <DashboardContent dashboardType={activeTab} filters={filters} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
