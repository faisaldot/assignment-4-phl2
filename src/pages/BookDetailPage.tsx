import { Link, useParams } from "react-router";

import { useGetBookByIdQuery } from "@/app/features/books/bookApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isError, isLoading, data: response } = useGetBookByIdQuery(id!);
  const book = response?.data;

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError || !response?.success) {
    return <div>Error loading book details.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-6 border rounded-lg bg-white shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
            <p className="text-lg text-gray-700 mb-4"> by {book?.author}</p>
          </div>
          <Badge variant={book?.available ? "default" : "destructive"}>
            {book?.available ? "Available" : "Not available"}
          </Badge>
        </div>
        <div className="my-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            <p>
              <strong>Genre:</strong>
              {book?.genre}
            </p>
            <p>
              <strong>ISBN1:</strong>
              {book?.isbn}
            </p>
            <p>
              <strong>Copies Available:</strong>
              {book?.copies}
            </p>
          </div>
          {book?.description && (
            <div className="mt-4">
              <p>
                <strong>Description: </strong>
              </p>
              <p className="mt-1 text-gray-600">{book.description}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-4 mt-6">
          <Button asChild>
            <Link to={`/edit-book/${book?._id}`}>Edit Book</Link>
          </Button>
          <Button asChild>
            <Link to={`/borrow/${book?._id}`}>Borrow Book</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
