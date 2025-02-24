import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Gift, ShoppingBag, Users } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Stamp Cards",
      value: "150",
      icon: CreditCard,
    },
    {
      title: "Gift Cards Balance",
      value: "$2,500",
      icon: Gift,
    },
    {
      title: "Total Customers",
      value: "450",
      icon: Users,
    },
    {
      title: "Today's Orders",
      value: "25",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
