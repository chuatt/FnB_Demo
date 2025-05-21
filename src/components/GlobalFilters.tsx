import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

interface GlobalFiltersProps {
  onFiltersChange?: (filters: {
    dateRange: DateRange | undefined;
    location: string;
    mealPeriod: string;
    menuCategories: string[];
  }) => void;
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  onFiltersChange = () => {},
}) => {
  // Default date range: last 30 days to today
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [location, setLocation] = useState<string>("all");
  const [mealPeriod, setMealPeriod] = useState<string>("all");
  const [menuCategories, setMenuCategories] = useState<string[]>(["all"]);

  // Sample data for filters
  const locations = [
    { id: "all", name: "All Locations" },
    { id: "loc1", name: "Downtown" },
    { id: "loc2", name: "Uptown" },
    { id: "loc3", name: "Midtown" },
    { id: "loc4", name: "Westside" },
  ];

  const mealPeriods = [
    { id: "all", name: "All Periods" },
    { id: "breakfast", name: "Breakfast" },
    { id: "lunch", name: "Lunch" },
    { id: "dinner", name: "Dinner" },
    { id: "brunch", name: "Brunch" },
  ];

  const menuCategoryOptions = [
    { id: "all", name: "All Categories" },
    { id: "appetizers", name: "Appetizers" },
    { id: "mains", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Beverages" },
    { id: "specials", name: "Specials" },
  ];

  // Handle menu category selection
  const handleCategoryChange = (category: string) => {
    setMenuCategories((prev) => {
      // If "all" is selected, clear other selections
      if (category === "all") {
        return ["all"];
      }

      // If another category is selected while "all" is active, remove "all"
      const newCategories =
        prev.includes("all") && category !== "all"
          ? [category]
          : prev.includes(category)
            ? prev.filter((c) => c !== category) // Remove if already selected
            : [...prev, category]; // Add if not selected

      // If no categories remain, select "all"
      if (newCategories.length === 0) {
        return ["all"];
      }

      return newCategories;
    });
  };

  // Update parent component when filters change
  React.useEffect(() => {
    onFiltersChange({
      dateRange,
      location,
      mealPeriod,
      menuCategories,
    });
  }, [dateRange, location, mealPeriod, menuCategories, onFiltersChange]);

  return (
    <div className="w-full bg-background border-b p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Date Range Picker */}
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                    {format(dateRange.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Location Selector */}
      <div className="flex items-center">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Meal Period Selector */}
      <div className="flex items-center">
        <Select value={mealPeriod} onValueChange={setMealPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select meal period" />
          </SelectTrigger>
          <SelectContent>
            {mealPeriods.map((period) => (
              <SelectItem key={period.id} value={period.id}>
                {period.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menu Categories */}
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between">
              <span>Menu Categories</span>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-4">
            <div className="space-y-2">
              {menuCategoryOptions.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={menuCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Apply Filters Button */}
      <Button className="bg-primary text-primary-foreground">
        Apply Filters
      </Button>
    </div>
  );
};

export default GlobalFilters;
