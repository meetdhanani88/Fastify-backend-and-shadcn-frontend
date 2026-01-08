import { FinanceDashboard } from './components/FinanceDashboard'
import { ButtonDemo } from './components/ButtonDemo'
import { ItemsManagement } from './components/ItemsManagement'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="finance-dashboard-theme">
      <div className="min-h-screen bg-background">
        {/* Header with Theme Toggle */}
        <div className="border-b bg-background sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">My App</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Tabs Navigation and Content */}
        <Tabs defaultValue="items" className="w-full">
          <div className="border-b px-6 pt-4">
            <TabsList>
              <TabsTrigger value="items">Items Management</TabsTrigger>
              <TabsTrigger value="dashboard">Finance Dashboard</TabsTrigger>
              <TabsTrigger value="buttons">Button Demo</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="items" className="mt-0">
            <ItemsManagement />
          </TabsContent>
          <TabsContent value="dashboard" className="mt-0">
            <FinanceDashboard />
          </TabsContent>
          <TabsContent value="buttons" className="mt-0">
            <ButtonDemo />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}

export default App
