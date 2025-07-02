import { SquarePen, Trash2, BookMinus } from "lucide-react";
import { useGetBooksQuery } from "@/app/features/books/bookApi";
import type { IBook } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function BookListPage() {
  const { isError, isLoading, data: books } = useGetBooksQuery();

  console.log(books);

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
          {books?.data.map((book: IBook) => (
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
    </>
  );
}
