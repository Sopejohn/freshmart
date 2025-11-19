import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  LayoutDashboard, 
  DollarSign, 
  UtensilsCrossed, 
  Users, 
  TrendingUp,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Package,
  Sparkles
} from "lucide-react";
import { FinancialsPage } from "./FinancialsPage";
import { MenuManagementPage } from "./MenuManagementPage";
import { StaffManagementPage } from "./StaffManagementPage";
import { AnalyticsPage } from "./AnalyticsPage";

interface AdminDashboardProps {
  user: { email: string; name: string; role?: string };
  onLogout: () => void;
}

type AdminView = 'overview' | 'financials' | 'menu' | 'staff' | 'analytics';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('overview');

  // Mock data for overview
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgGradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      iconBg: "bg-green-100"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12.3% from last month",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100"
    },
    {
      title: "Menu Items",
      value: "48",
      change: "5 added this month",
      icon: Package,
      color: "text-orange-600",
      bgGradient: "bg-gradient-to-br from-orange-500 to-amber-600",
      iconBg: "bg-orange-100"
    },
    {
      title: "Staff Members",
      value: "24",
      change: "2 new hires",
      icon: Users,
      color: "text-purple-600",
      bgGradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      iconBg: "bg-purple-100"
    }
  ];

  const quickActions = [
    {
      title: "View Financials",
      description: "Revenue, expenses, and profit analytics",
      icon: DollarSign,
      action: () => setCurrentView('financials'),
      gradient: "from-green-500 to-emerald-600",
      iconColor: "text-green-600"
    },
    {
      title: "Manage Menu",
      description: "Add, edit, or remove menu items",
      icon: UtensilsCrossed,
      action: () => setCurrentView('menu'),
      gradient: "from-orange-500 to-amber-600",
      iconColor: "text-orange-600"
    },
    {
      title: "Manage Staff",
      description: "View and manage team members",
      icon: Users,
      action: () => setCurrentView('staff'),
      gradient: "from-blue-500 to-cyan-600",
      iconColor: "text-blue-600"
    },
    {
      title: "View Analytics",
      description: "Order trends and popular items",
      icon: TrendingUp,
      action: () => setCurrentView('analytics'),
      gradient: "from-purple-500 to-pink-600",
      iconColor: "text-purple-600"
    }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: "$45.99", status: "Completed", time: "2 min ago" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "$32.50", status: "In Progress", time: "5 min ago" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: "$67.20", status: "Completed", time: "12 min ago" },
    { id: "#ORD-004", customer: "Sarah Williams", amount: "$28.99", status: "Pending", time: "18 min ago" },
    { id: "#ORD-005", customer: "David Brown", amount: "$54.75", status: "Completed", time: "25 min ago" }
  ];

  if (currentView === 'financials') {
    return <FinancialsPage onBack={() => setCurrentView('overview')} onLogout={onLogout} user={user} />;
  }

  if (currentView === 'menu') {
    return <MenuManagementPage onBack={() => setCurrentView('overview')} onLogout={onLogout} user={user} />;
  }

  if (currentView === 'staff') {
    return <StaffManagementPage onBack={() => setCurrentView('overview')} onLogout={onLogout} user={user} />;
  }

  if (currentView === 'analytics') {
    return <AnalyticsPage onBack={() => setCurrentView('overview')} onLogout={onLogout} user={user} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  FreshMart Admin
                </h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name} 👋</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgGradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl">Quick Actions</h2>
            <div className="ml-3 h-1 flex-1 bg-gradient-to-r from-orange-200 to-transparent rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white overflow-hidden relative"
                onClick={action.action}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <CardContent className="pt-6 relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg mb-2 group-hover:text-orange-600 transition-colors">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <div className="flex items-center text-orange-600 text-sm font-medium">
                    Open <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-orange-600" />
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentOrders.map((order, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-4 px-6 hover:bg-gradient-to-r hover:from-orange-50/30 hover:to-yellow-50/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="font-medium text-slate-800">{order.amount}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium shadow-sm ${
                      order.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                      order.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                      'bg-gradient-to-r from-yellow-400 to-amber-400 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-muted-foreground">{order.time}</p>
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