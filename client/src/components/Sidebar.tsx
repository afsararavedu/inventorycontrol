import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Package, 
  BarChart3, 
  CreditCard, 
  Calendar,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Sales", href: "/sales", icon: ShoppingCart },
  { label: "Other Data", href: "/other-data", icon: FileText },
  { label: "Stock", href: "/stock", icon: Package },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Credits", href: "/credits", icon: CreditCard },
  { label: "Calendar", href: "/calendar", icon: Calendar },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-border fixed left-0 top-0 z-50 shadow-xl shadow-black/5">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25">
          S
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-foreground leading-none">SalesPro</h1>
          <p className="text-xs text-muted-foreground font-medium mt-1">v2.0 Dashboard</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-border/50">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
