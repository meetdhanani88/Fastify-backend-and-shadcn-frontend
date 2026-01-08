import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ThemeToggle } from "./ThemeToggle"

// Sample financial data
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 40000 },
]

const expenseBreakdown = [
  { category: "Salaries", amount: 25000, color: "hsl(var(--chart-1))" },
  { category: "Marketing", amount: 12000, color: "hsl(var(--chart-2))" },
  { category: "Operations", amount: 8000, color: "hsl(var(--chart-3))" },
  { category: "Technology", amount: 15000, color: "hsl(var(--chart-4))" },
  { category: "Other", amount: 5000, color: "hsl(var(--chart-5))" },
]

const profitData = [
  { month: "Jan", profit: 13000, margin: 28.9 },
  { month: "Feb", profit: 17000, margin: 32.7 },
  { month: "Mar", profit: 15000, margin: 31.3 },
  { month: "Apr", profit: 23000, margin: 37.7 },
  { month: "May", profit: 19000, margin: 34.5 },
  { month: "Jun", profit: 27000, margin: 40.3 },
]

const transactions = [
  { id: 1, date: "2024-06-15", description: "Client Payment - Project Alpha", amount: 15000, type: "income", category: "Revenue" },
  { id: 2, date: "2024-06-14", description: "Office Rent", amount: -5000, type: "expense", category: "Operations" },
  { id: 3, date: "2024-06-13", description: "Marketing Campaign", amount: -3500, type: "expense", category: "Marketing" },
  { id: 4, date: "2024-06-12", description: "Client Payment - Project Beta", amount: 12000, type: "income", category: "Revenue" },
  { id: 5, date: "2024-06-11", description: "Software License", amount: -2500, type: "expense", category: "Technology" },
  { id: 6, date: "2024-06-10", description: "Consulting Fee", amount: 8000, type: "income", category: "Revenue" },
  { id: 7, date: "2024-06-09", description: "Employee Salaries", amount: -25000, type: "expense", category: "Salaries" },
  { id: 8, date: "2024-06-08", description: "Client Payment - Project Gamma", amount: 18000, type: "income", category: "Revenue" },
]

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const profitChartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function FinanceDashboard() {
  const [timeRange, setTimeRange] = React.useState("6m")

  // Calculate totals
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

  const revenueChange = 12.5
  const expensesChange = -5.2
  const profitChange = 18.3
  const marginChange = 2.4

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-muted-foreground">Overview of your financial performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <ThemeToggle />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {revenueChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{revenueChange}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{revenueChange}%</span>
                </>
              )}
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {expensesChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">+{expensesChange}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{expensesChange}%</span>
                </>
              )}
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {profitChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{profitChange}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{profitChange}%</span>
                </>
              )}
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin}%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {marginChange > 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{marginChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{marginChange}%</span>
                </>
              )}
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Expenses</TabsTrigger>
          <TabsTrigger value="profit">Profit Trends</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly comparison over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fill="url(#fillRevenue)"
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    fill="url(#fillExpenses)"
                    stackId="2"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={profitChartConfig}>
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="var(--color-profit)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margin</CardTitle>
                <CardDescription>Monthly profit margin percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={profitChartConfig}>
                  <BarChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="margin" fill="var(--color-profit)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Distribution of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <ChartContainer config={{}} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-4">
                  {expenseBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-4 w-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        ${item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A list of your recent financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

