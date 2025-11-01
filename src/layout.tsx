import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./components/routes/home/render"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu"
import { Shield } from "lucide-react"

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-muted/30 to-background flex flex-col">
      <BrowserRouter>
        {/* 🌐 Full-width Header */}
        <header className="border-b backdrop-blur-md bg-background/80 sticky top-0 z-50 w-full">
          <div className="flex items-center justify-between px-8 py-4 w-full">
            {/* Logo + Title */}
            <Link
              to="/"
              className="text-xl font-semibold flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Shield className="h-5 w-5" />
              Patrol Manager
            </Link>

            {/* Navigation */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 w-48">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/about"
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3 w-48">
                    <NavigationMenuLink asChild>
                      <a
                        href="https://github.com/Patrol-Manager"
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        GitHub
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        {/* Main Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t text-center py-4 text-muted-foreground text-sm">
          © {new Date().getFullYear()} Patrol Manager — Built with ❤️ using React, Tauri, and ShadCN UI
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default Layout