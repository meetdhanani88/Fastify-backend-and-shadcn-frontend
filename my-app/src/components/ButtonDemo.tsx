import * as React from "react"
import { 
  Download, 
  Mail, 
  Plus, 
  Trash2, 
  Settings, 
  Heart,
  Loader2,
  ArrowRight,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ButtonDemo() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Button Variants</h1>
        <p className="text-muted-foreground">
          All available button variants and styles in shadcn/ui
        </p>
      </div>

      {/* Default Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Default Variants</CardTitle>
          <CardDescription>All button style variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Different button sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline">Small Outline</Button>
            <Button size="default" variant="outline">Default Outline</Button>
            <Button size="lg" variant="outline">Large Outline</Button>
          </div>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Icon Buttons</CardTitle>
          <CardDescription>Buttons with icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Download">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Heart">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive" aria-label="Delete">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Buttons with loading indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
            <Button variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Click to Load"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disabled States */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled States</CardTitle>
          <CardDescription>All variants in disabled state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="destructive" disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled</Button>
            <Button variant="ghost" disabled>Disabled</Button>
            <Button variant="link" disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* As Child Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>As Child Pattern</CardTitle>
          <CardDescription>Using button as a wrapper for custom elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#demo">Link Button</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#demo">Outline Link</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#demo">Ghost Link</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Variants with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>All Variants with Icons</CardTitle>
          <CardDescription>Complete showcase of variants with icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Success
            </Button>
            <Button variant="secondary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="destructive">
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="ghost">
              <Heart className="mr-2 h-4 w-4" />
              Favorite
            </Button>
            <Button variant="link">
              <ArrowRight className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Size Variations with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations with Icons</CardTitle>
          <CardDescription>Different sizes with icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">
              <Plus className="mr-2 h-3 w-3" />
              Small
            </Button>
            <Button size="default">
              <Plus className="mr-2 h-4 w-4" />
              Default
            </Button>
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Large
            </Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-3 w-3" />
              Small
            </Button>
            <Button size="default" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Default
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-5 w-5" />
              Large
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-world Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Real-world Examples</CardTitle>
          <CardDescription>Common button patterns in applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="secondary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>Code snippets for each variant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm font-mono bg-muted p-4 rounded-lg overflow-x-auto">
            <div>
              <div className="text-muted-foreground mb-2">// Default variant</div>
              <div>{'<Button>Default</Button>'}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-2">// With icon</div>
              <div>{'<Button><Icon className="mr-2 h-4 w-4" />Text</Button>'}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-2">// Icon only</div>
              <div>{'<Button size="icon"><Icon className="h-4 w-4" /></Button>'}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-2">// Loading state</div>
              <div>{'<Button disabled><Loader2 className="animate-spin" />Loading</Button>'}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-2">// As child (for links)</div>
              <div>{'<Button asChild><a href="/">Link</a></Button>'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

