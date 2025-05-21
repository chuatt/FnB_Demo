import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "./DashboardLayout";
import AiInsightsPanel from "./AiInsightsPanel";
import GlobalFilters from "./GlobalFilters";
import DashboardContent from "./DashboardContent";

type DashboardTab = "sales" | "menu" | "operations" | "survey";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>("sales");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("all");
  const [selectedMealPeriod, setSelectedMealPeriod] = useState<string>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [insightsVisible, setInsightsVisible] = useState<boolean>(true);

  // Mock insights data based on selected tab
  const getInsightsData = () => {
    switch (selectedTab) {
      case "sales":
        return {
          summary:
            "Revenue at Downtown Restaurant is 15% below budget this month. Top void reason: 'Order Errors' (30% of voids). STLY comparison shows Avg Check dropped 10%.",
          insights: [
            {
              text: "Retrain staff at Downtown Restaurant on POS workflows to reduce order errors.",
              trend: "negative",
            },
            {
              text: "Launch a weekend promotion to boost Friday covers (e.g., 20% discount on appetizers).",
              trend: "positive",
            },
          ],
        };
      case "menu":
        return {
          summary:
            "Desserts are underperforming (15% of revenue vs. 25% budget). 'Chocolate Cake' (Dog) has low profit and sales. Server John has 2x voids vs. average.",
          insights: [
            {
              text: "Bundle 'Chocolate Cake' with coffee to boost dessert sales.",
              trend: "positive",
            },
            {
              text: "Investigate Server John's void patterns: 50% are 'Wrong Orders'.",
              trend: "negative",
            },
          ],
        };
      case "operations":
        return {
          summary:
            "RevPASH drops 25% during lunch vs. dinner. Table turnover peaks at 7 PM but slows to 1.0/hr post-9 PM.",
          insights: [
            {
              text: "Test a lunch combo deal to improve midday RevPASH.",
              trend: "positive",
            },
            {
              text: "Assign an extra busser post-9 PM to speed up table turnover.",
              trend: "positive",
            },
          ],
        };
      case "survey":
        return {
          summary:
            "NPS dropped 20 points this month. Negative comments: 'slow service' (35%) and 'cold food' (28%). CSAT for dinner is 3.1 vs. 4.3 for lunch.",
          insights: [
            {
              text: "Audit kitchen workflows at Downtown Restaurant to address 'cold food' complaints.",
              trend: "negative",
            },
            {
              text: "Add a hostess during dinner peaks to reduce wait times (mentioned in 40% of negative comments).",
              trend: "positive",
            },
          ],
        };
      default:
        return { summary: "", insights: [] };
    }
  };

  const handleFilterChange = (filters: {
    dateRange?: { from: Date; to: Date };
    restaurant?: string;
    mealPeriod?: string;
    categories?: string[];
  }) => {
    if (filters.dateRange) setDateRange(filters.dateRange);
    if (filters.restaurant) setSelectedRestaurant(filters.restaurant);
    if (filters.mealPeriod) setSelectedMealPeriod(filters.mealPeriod);
    if (filters.categories) setSelectedCategories(filters.categories);
  };

  const toggleInsights = () => {
    setInsightsVisible(!insightsVisible);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        <div className="flex flex-col w-full">
          <GlobalFilters
            dateRange={dateRange}
            selectedRestaurant={selectedRestaurant}
            selectedMealPeriod={selectedMealPeriod}
            selectedCategories={selectedCategories}
            onFilterChange={handleFilterChange}
          />

          {insightsVisible && (
            <AiInsightsPanel
              data={getInsightsData()}
              onToggle={toggleInsights}
            />
          )}

          <div className="p-4">
            <Tabs
              defaultValue="sales"
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value as DashboardTab)}
              className="w-full"
            >
              <TabsList className="mb-4">
                <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
                <TabsTrigger value="menu">Menu Analysis</TabsTrigger>
                <TabsTrigger value="operations">
                  Restaurant Operations
                </TabsTrigger>
                <TabsTrigger value="survey">Guest Survey Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="sales">
                <DashboardContent
                  type="sales"
                  filters={{
                    dateRange,
                    restaurant: selectedRestaurant,
                    mealPeriod: selectedMealPeriod,
                    categories: selectedCategories,
                  }}
                />
              </TabsContent>

              <TabsContent value="menu">
                <DashboardContent
                  type="menu"
                  filters={{
                    dateRange,
                    restaurant: selectedRestaurant,
                    mealPeriod: selectedMealPeriod,
                    categories: selectedCategories,
                  }}
                />
              </TabsContent>

              <TabsContent value="operations">
                <DashboardContent
                  type="operations"
                  filters={{
                    dateRange,
                    restaurant: selectedRestaurant,
                    mealPeriod: selectedMealPeriod,
                    categories: selectedCategories,
                  }}
                />
              </TabsContent>

              <TabsContent value="survey">
                <DashboardContent
                  dashboardType="survey"
                  selectedFilters={{
                    dateRange,
                    restaurant: selectedRestaurant,
                    mealPeriod: selectedMealPeriod,
                    menuCategory: selectedCategories,
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
