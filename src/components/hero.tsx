import { Button } from "@/components/ui/button";
import BookListPage from "@/pages/BookListPage";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <BookOpen className="h-16 w-16 text-primary" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              <span className="text-primary">Welcome to Library</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, manage, and explore your digital book collection. Your
              gateway to knowledge and literature.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/books" className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Browse All Books</span>
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to="/create-book" className="flex items-center space-x-2">
                  <span>Add New Book</span>
                  <ArrowRight className="h-5 w-5 " />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Book
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our highlighted selection from the collection
            </p>
          </div>
          <BookListPage />
        </div>
      </section>
    </div>
  );
}
