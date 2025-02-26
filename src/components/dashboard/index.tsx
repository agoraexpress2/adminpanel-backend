import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadReportDialog } from "./DownloadReportDialog";
import {
  CreditCard,
  Gift,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Dashboard() {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const stats = [
    {
      title: "Active Stamp Cards",
      value: "150",
      change: "+12.3%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Gift Cards Balance",
      value: "$2,500",
      change: "+8.1%",
      trend: "up",
      icon: Gift,
    },
    {
      title: "Total Customers",
      value: "450",
      change: "+23.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Today's Orders",
      value: "25",
      change: "-4.5%",
      trend: "down",
      icon: ShoppingBag,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "stamp",
      customer: "Ahmed Ali",
      action: "Redeemed stamp card",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "gift",
      customer: "Sara Ahmed",
      action: "Purchased gift card",
      time: "5 minutes ago",
    },
    {
      id: 3,
      type: "stamp",
      customer: "Mohammed Hassan",
      action: "Added new stamp",
      time: "10 minutes ago",
    },
    {
      id: 4,
      type: "gift",
      customer: "Fatima Omar",
      action: "Gift card balance check",
      time: "15 minutes ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => setIsDownloadDialogOpen(true)}>
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    {activity.type === "stamp" ? (
                      <CreditCard className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Gift className="h-5 w-5 text-purple-500" />
                    )}
                    <div>
                      <p className="font-medium">{activity.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stamps" className="space-y-4">
              <TabsList>
                <TabsTrigger value="stamps">Stamp Cards</TabsTrigger>
                <TabsTrigger value="gifts">Gift Cards</TabsTrigger>
              </TabsList>
              <TabsContent value="stamps" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Total Active Cards</p>
                    <p className="text-2xl font-bold">150</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Redemption Rate</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Completion Time</p>
                    <p className="text-2xl font-bold">14 days</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="gifts" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Active Gift Cards</p>
                    <p className="text-2xl font-bold">85</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Balance</p>
                    <p className="text-2xl font-bold">$2,500</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Value</p>
                    <p className="text-2xl font-bold">$29.41</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <DownloadReportDialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadDialogOpen}
        onDownload={({ reportType, timeRange }) => {
          console.log(`Downloading ${reportType} report for ${timeRange}`);
          // Here you would implement the actual report download
          alert(`Downloading ${reportType} report for ${timeRange}`);
        }}
      />
    </div>
  );
}
