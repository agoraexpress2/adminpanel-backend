import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Agora Win Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <UserCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
