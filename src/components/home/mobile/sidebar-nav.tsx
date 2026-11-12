import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";

type SidebarNavProps = {
  navLinkClass: (href: string) => string;
  navItems: { href: string; label: string }[];
};

export default function SidebarNav({
  navLinkClass,
  navItems,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 border lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="bg-panel-lowest/90 w-72 pt-12"
      >
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(navLinkClass(item.href), "w-full justify-start")}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
