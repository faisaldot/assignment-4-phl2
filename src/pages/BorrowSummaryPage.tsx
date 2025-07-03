import { useGetBorrowSummaryQuery } from "@/app/features/borrows/borrowApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useId } from "react";

export default function BorrowSummaryPage() {
  const keyId = useId();
  const { isError, isLoading, data: response } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return <div>Loading summary...</div>;
  }
  if (isError || !response?.success) {
    return <div>Error loading borrow summary.</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Borrowed Books Summary</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Quantity Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.length > 0 ? (
            response.data.map((item) => (
              <TableRow key={keyId}>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell className="text-center">
                  {item.totalQuantity}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No Book have been borrowed yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
