import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Plus } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Library</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/books" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>All Books</span>
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/create-book" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Books</span>
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link
                to="/borrow-summary"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Borrow Summary</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
