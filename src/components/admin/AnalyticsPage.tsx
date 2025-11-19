import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, TrendingUp, Clock, Star } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AnalyticsPageProps {
  onBack: () => void;
  onLogout: () => void;
  user: { email: string; name: string };
}

export function AnalyticsPage({ onBack, onLogout }: AnalyticsPageProps) {
  // Mock data for most frequently ordered items
  const mostFrequentItems = [
    { name: "Jollof Rice", orders: 456, revenue: 8664.44, trend: "+15%" },
    { name: "Pounded Yam & Egusi", orders: 389, revenue: 9717.11, trend: "+22%" },
    { name: "Suya Platter", orders: 342, revenue: 7852.58, trend: "+18%" },
    { name: "Pepper Soup", orders: 298, revenue: 4765.02, trend: "+12%" },
    { name: "Fried Plantain", orders: 267, revenue: 2937.33, trend: "+8%" },
    { name: "Egusi Soup", orders: 234, revenue: 5382.66, trend: "+20%" },
    { name: "Zobo Drink", orders: 523, revenue: 3132.77, trend: "+25%" },
    { name: "Kunu Drink", orders: 456, revenue: 2736.00, trend: "+19%" }
  ];

  // Mock data for recent orders
  const recentOrders = [
    { time: "2 min ago", customer: "Chioma Eze", items: ["Jollof Rice", "Zobo Drink"], total: 24.98 },
    { time: "5 min ago", customer: "Tunde Adebayo", items: ["Pounded Yam & Egusi"], total: 24.99 },
    { time: "8 min ago", customer: "Ngozi Okonkwo", items: ["Suya Platter", "Kunu Drink"], total: 28.98 },
    { time: "12 min ago", customer: "Ibrahim Musa", items: ["Pepper Soup", "Fried Plantain"], total: 26.98 },
    { time: "15 min ago", customer: "Aisha Mohammed", items: ["Jollof Rice", "Egusi Soup"], total: 41.98 },
    { time: "18 min ago", customer: "Emeka Nnaji", items: ["Suya Platter"], total: 22.99 },
    { time: "22 min ago", customer: "Funke Williams", items: ["Jollof Rice", "Zobo Drink", "Fried Plantain"], total: 35.97 },
    { time: "25 min ago", customer: "Olu Bakare", items: ["Pounded Yam & Egusi", "Palm Wine"], total: 33.98 }
  ];

  // Chart data for order trends
  const orderTrends = [
    { hour: "9AM", orders: 12 },
    { hour: "10AM", orders: 18 },
    { hour: "11AM", orders: 25 },
    { hour: "12PM", orders: 45 },
    { hour: "1PM", orders: 52 },
    { hour: "2PM", orders: 38 },
    { hour: "3PM", orders: 22 },
    { hour: "4PM", orders: 19 },
    { hour: "5PM", orders: 28 },
    { hour: "6PM", orders: 42 },
    { hour: "7PM", orders: 56 },
    { hour: "8PM", orders: 48 },
    { hour: "9PM", orders: 35 }
  ];

  // Weekly comparison data
  const weeklyData = [
    { day: "Mon", thisWeek: 78, lastWeek: 65 },
    { day: "Tue", thisWeek: 85, lastWeek: 72 },
    { day: "Wed", thisWeek: 92, lastWeek: 80 },
    { day: "Thu", thisWeek: 88, lastWeek: 75 },
    { day: "Fri", thisWeek: 125, lastWeek: 110 },
    { day: "Sat", thisWeek: 145, lastWeek: 128 },
    { day: "Sun", thisWeek: 118, lastWeek: 105 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl">Order Analytics</h1>
                <p className="text-sm text-muted-foreground">Track popular items and order trends</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <span className="text-sm text-green-600">+18% this week</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders (Week)</p>
              <p className="text-3xl">731</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Most Popular</p>
              <p className="text-3xl">Jollof Rice</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Peak Hours</p>
              <p className="text-3xl">7-8 PM</p>
            </CardContent>
          </Card>
        </div>

        {/* Most Frequently Ordered Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Most Frequently Ordered Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostFrequentItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-medium text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium">${item.revenue.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      item.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Trends Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Trends (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lastWeek" fill="#cbd5e1" name="Last Week" />
                <Bar dataKey="thisWeek" fill="#f97316" name="This Week" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Most Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                  </div>
                  <div className="flex items-center space-x-8">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground w-24 text-right">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
