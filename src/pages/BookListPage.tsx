import { SquarePen, Trash2, BookMinus } from "lucide-react";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/app/features/books/bookApi";
import type { IBook } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function BookListPage() {
  const { isError, isLoading, data: response } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog(bookId: string) {
    setSelectedBookId(bookId);
    setIsDialogOpen(true);
  }

  async function handleDelete() {
    if (!selectedBookId) return;
    try {
      const res = await deleteBook(selectedBookId).unwrap();
      if (res.success) {
        toast.success("Book deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete the book.");
    } finally {
      setIsDialogOpen(false);
      setSelectedBookId(null);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong, can't find any book</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response?.data.map((book: IBook) => (
            <TableRow key={book._id}>
              <TableCell>
                <Link
                  to={`/books/${book._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.title}
                </Link>
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                <Badge variant={book.available ? "default" : "destructive"}>
                  {book.available ? "Available" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell className="flex space-x-4">
                <Link to={`/edit-book/${book._id}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <SquarePen
                        size="20px"
                        className="hover:text-blue-500 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Book</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
                <Link to={``}>
                  <Tooltip>
                    <TooltipTrigger>
                      <BookMinus
                        size="20px"
                        className="hover:text-green-500 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Borrow Book</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
                <Link to={``}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash2
                        size="20px"
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleOpenDialog(book._id)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Todo</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This book is permanently delete the book from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting" : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
