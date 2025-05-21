import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, BarChart, PieChart, CircleSlash } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardContentProps {
  selectedFilters?: {
    dateRange?: { from: Date; to: Date };
    restaurant?: string;
    mealPeriod?: string;
    menuCategory?: string[];
  };
  dashboardType?: string;
}

const DashboardContent = ({
  selectedFilters = {},
  dashboardType = "sales",
}: DashboardContentProps) => {
  return (
    <div className="w-full h-full bg-background p-4">
      {/* Sales Analysis Dashboard */}
      {dashboardType === "sales" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs. Actual</CardTitle>
                <CardDescription>
                  Revenue, Covers, Avg Check comparison
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Line Chart: Budget vs. Actual
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Trends</CardTitle>
                <CardDescription>Revenue by Day of Week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Weekly Trends
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
                <CardDescription>Revenue vs. STLY, ST2Y, ST3Y</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Line Chart: Historical Comparison
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Restaurants</CardTitle>
                <CardDescription>Top 10 Restaurants by Revenue</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Top Restaurants
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Void Analysis</CardTitle>
                <CardDescription>
                  Top 10 Void Reasons by Restaurant
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Stacked Bar Chart: Void Analysis
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Menu Analysis Dashboard */}
      {dashboardType === "menu" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Treemap visualization</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Treemap: Revenue by Category
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Menu Items</CardTitle>
                <CardDescription>Top 10 Menu Items by Revenue</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Top Menu Items
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menu Engineering</CardTitle>
                <CardDescription>Profit vs. Items Sold</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Scatter Plot: Menu Engineering
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RFM Analysis</CardTitle>
                <CardDescription>
                  Recency, Frequency, Monetary Value
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Heatmap: RFM Analysis
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Sales per Server</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Staff Performance
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Restaurant Operations Dashboard */}
      {dashboardType === "operations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">
                  Seat Occupancy
                </CardTitle>
                <CardDescription>Current percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">78%</div>
                <p className="text-sm text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">
                  Table Turnover
                </CardTitle>
                <CardDescription>Per hour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">2.3</div>
                <p className="text-sm text-muted-foreground">
                  -0.2 from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">RevPASH</CardTitle>
                <CardDescription>
                  Revenue per available seat hour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$42.50</div>
                <p className="text-sm text-muted-foreground">
                  +$3.25 from last week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seat Occupancy Trends</CardTitle>
                <CardDescription>By Day/Meal Period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Line Chart: Seat Occupancy Trends
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table Turnover Trends</CardTitle>
                <CardDescription>By Day/Meal Period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Table Turnover Trends
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RevPASH Analysis</CardTitle>
                <CardDescription>Revenue + Covers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Dual-axis Chart: RevPASH Analysis
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Guest Survey Analysis Dashboard */}
      {dashboardType === "survey" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">NPS Score</CardTitle>
                <CardDescription>Net Promoter Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">72</div>
                <p className="text-sm text-muted-foreground">
                  -3 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">CSAT</CardTitle>
                <CardDescription>Customer Satisfaction Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">4.2/5</div>
                <p className="text-sm text-muted-foreground">
                  +0.1 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">
                  Social Media
                </CardTitle>
                <CardDescription>
                  Average rating across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">4.5/5</div>
                <p className="text-sm text-muted-foreground">
                  No change from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={cardVariants}>
              <Card className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <CardHeader className="bg-card/50 pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold tracking-tight">
                        NPS Categories
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Promoters, Passives, Detractors
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs bg-primary/10 text-primary border-primary/20"
                    >
                      Monthly
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] pt-4"></CardContent>
              </Card>
            </motion.div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended by Friends</CardTitle>
                <CardDescription>Percentage breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
                <div className="text-muted-foreground">
                  Bar Chart: Recommended by Friends
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Comment sentiments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: "Food Quality", positive: 85, negative: 15 },
                      { category: "Service", positive: 75, negative: 25 },
                      { category: "Ambiance", positive: 90, negative: 10 },
                      { category: "Value", positive: 65, negative: 35 },
                      { category: "Cleanliness", positive: 95, negative: 5 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="negative" stackId="a" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Negative Themes</CardTitle>
                <CardDescription>Common issues in feedback</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">Issue</th>
                      <th className="p-2 text-left">Frequency</th>
                      <th className="p-2 text-left">Impact Score</th>
                      <th className="p-2 text-left">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-muted">
                      <td className="p-2">Long Wait Times</td>
                      <td className="p-2">42</td>
                      <td className="p-2">High</td>
                      <td className="p-2 text-red-500">↑ 15%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Food Temperature</td>
                      <td className="p-2">38</td>
                      <td className="p-2">Medium</td>
                      <td className="p-2 text-red-500">↑ 8%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Portion Size</td>
                      <td className="p-2">35</td>
                      <td className="p-2">Medium</td>
                      <td className="p-2 text-green-500">↓ 5%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Staff Attentiveness</td>
                      <td className="p-2">29</td>
                      <td className="p-2">High</td>
                      <td className="p-2 text-amber-500">→ 0%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Noise Level</td>
                      <td className="p-2">24</td>
                      <td className="p-2">Low</td>
                      <td className="p-2 text-red-500">↑ 12%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Menu Variety</td>
                      <td className="p-2">18</td>
                      <td className="p-2">Medium</td>
                      <td className="p-2 text-green-500">↓ 10%</td>
                    </tr>
                    <tr className="border-b border-muted">
                      <td className="p-2">Pricing</td>
                      <td className="p-2">15</td>
                      <td className="p-2">High</td>
                      <td className="p-2 text-amber-500">→ 2%</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
