import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard, PiggyBank } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FinancialsPageProps {
  onBack: () => void;
  onLogout: () => void;
  user: { email: string; name: string };
}

export function FinancialsPage({ onBack, onLogout, user }: FinancialsPageProps) {
  // Mock financial data
  const revenueData = [
    { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
    { month: 'Feb', revenue: 15000, expenses: 9000, profit: 6000 },
    { month: 'Mar', revenue: 18000, expenses: 10000, profit: 8000 },
    { month: 'Apr', revenue: 22000, expenses: 11000, profit: 11000 },
    { month: 'May', revenue: 25000, expenses: 12000, profit: 13000 },
    { month: 'Jun', revenue: 28000, expenses: 13000, profit: 15000 },
    { month: 'Jul', revenue: 32000, expenses: 14000, profit: 18000 },
    { month: 'Aug', revenue: 30000, expenses: 13500, profit: 16500 },
    { month: 'Sep', revenue: 35000, expenses: 15000, profit: 20000 },
    { month: 'Oct', revenue: 38000, expenses: 16000, profit: 22000 },
    { month: 'Nov', revenue: 42000, expenses: 17000, profit: 25000 },
    { month: 'Dec', revenue: 45231, expenses: 18000, profit: 27231 }
  ];

  const categoryData = [
    { name: 'Main Dishes', value: 45, color: '#f97316' },
    { name: 'Soups', value: 25, color: '#eab308' },
    { name: 'Drinks', value: 20, color: '#22c55e' },
    { name: 'Sides', value: 10, color: '#3b82f6' }
  ];

  const dailyOrders = [
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 52 },
    { day: 'Wed', orders: 48 },
    { day: 'Thu', orders: 61 },
    { day: 'Fri', orders: 78 },
    { day: 'Sat', orders: 85 },
    { day: 'Sun', orders: 72 }
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      isPositive: true,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100"
    },
    {
      title: "Total Expenses",
      value: "$18,000",
      change: "+8.2%",
      isPositive: false,
      icon: Wallet,
      gradient: "from-red-500 to-rose-600",
      iconBg: "bg-red-100"
    },
    {
      title: "Net Profit",
      value: "$27,231",
      change: "+32.4%",
      isPositive: true,
      icon: PiggyBank,
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100"
    },
    {
      title: "Profit Margin",
      value: "60.2%",
      change: "+5.3%",
      isPositive: true,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-600",
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/20 to-emerald-50/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="hover:bg-green-50 hover:text-green-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Financial Analytics
                </h1>
                <p className="text-sm text-muted-foreground">Track revenue, expenses, and profitability 📊</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-green-200 hover:bg-green-50 hover:text-green-600 hover:border-green-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl`}>
                    <stat.icon className={`h-6 w-6 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <span className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                    stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue vs Expenses Chart */}
        <Card className="mb-8 border-0 shadow-lg overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-green-50/50 to-emerald-50/50">
            <CardTitle className="flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-3"></div>
              Revenue vs Expenses (2024)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  name="Revenue" 
                  dot={{ fill: '#f97316', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  name="Expenses" 
                  dot={{ fill: '#ef4444', r: 4 }}
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#22c55e" 
                  strokeWidth={3} 
                  name="Profit" 
                  dot={{ fill: '#22c55e', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue by Category */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50/50 to-amber-50/50">
              <CardTitle className="flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full mr-3"></div>
                Revenue by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {categoryData.map((cat, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm text-muted-foreground">{cat.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Orders */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
              <CardTitle className="flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full mr-3"></div>
                Orders This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyOrders}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#fb923c" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="orders" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Breakdown */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50/50 to-pink-50/50">
            <CardTitle className="flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
              Monthly Financial Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Month</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Revenue</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Expenses</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Profit</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.slice(-6).reverse().map((data, index) => {
                    const margin = ((data.profit / data.revenue) * 100).toFixed(1);
                    return (
                      <tr key={index} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-colors">
                        <td className="py-4 px-4 font-medium">{data.month} 2024</td>
                        <td className="text-right py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                            ${data.revenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 font-medium">
                            ${data.expenses.toLocaleString()}
                          </span>
                        </td>
                        <td className="text-right py-4 px-4 font-semibold">${data.profit.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                            {margin}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}