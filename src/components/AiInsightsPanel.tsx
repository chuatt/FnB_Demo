import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Insight {
  id: string;
  text: string;
  type: "positive" | "negative" | "neutral";
}

interface ActionItem {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
}

interface AiInsightsPanelProps {
  insights?: Insight[];
  actionItems?: ActionItem[];
  dashboardType?: "sales" | "menu" | "operations" | "survey";
  isLoading?: boolean;
}

const AiInsightsPanel = ({
  insights = [
    {
      id: "1",
      text: 'Revenue at Downtown Restaurant is 15% below budget this month. Top void reason: "Order Errors" (30% of voids). STLY comparison shows Avg Check dropped 10%.',
      type: "negative",
    },
    {
      id: "2",
      text: "Weekend covers have increased by 8% compared to last month, indicating successful weekend promotions.",
      type: "positive",
    },
    {
      id: "3",
      text: "Average check size remains consistent with previous quarter at $42.50 per guest.",
      type: "neutral",
    },
  ],
  actionItems = [
    {
      id: "1",
      text: "Retrain staff at Downtown Restaurant on POS workflows to reduce order errors.",
      priority: "high",
    },
    {
      id: "2",
      text: "Launch a weekend promotion to boost Friday covers (e.g., 20% discount on appetizers).",
      priority: "medium",
    },
    {
      id: "3",
      text: "Review pricing strategy for high-margin menu items to improve average check size.",
      priority: "low",
    },
  ],
  dashboardType = "sales",
  isLoading = false,
}: AiInsightsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const dashboardTitles = {
    sales: "Sales Analysis Insights",
    menu: "Menu Performance Insights",
    operations: "Restaurant Operations Insights",
    survey: "Guest Satisfaction Insights",
  };

  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
    }
  };

  const getPriorityBadge = (priority: ActionItem["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>;
      case "low":
        return <Badge>Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-white shadow-md mb-6">
      <div
        className="flex justify-between items-center p-4 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold">
            {dashboardTitles[dashboardType]} {isLoading && "(Updating...)"}
          </h2>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Key Observations
                  </h3>
                  <ul className="space-y-3">
                    {insights.map((insight) => (
                      <li key={insight.id} className="flex items-start gap-2">
                        {getInsightIcon(insight.type)}
                        <span className="text-sm">{insight.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-3">
                    Recommended Actions
                  </h3>
                  <ul className="space-y-4">
                    {actionItems.map((item) => (
                      <li key={item.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.text}</span>
                          {getPriorityBadge(item.priority)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </motion.div>
      )}
    </Card>
  );
};

export default AiInsightsPanel;
