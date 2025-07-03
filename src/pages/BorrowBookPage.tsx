import { useGetBookByIdQuery } from "@/app/features/books/bookApi";
import { useBorrowBookMutation } from "@/app/features/borrows/borrowApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { borrowBookSchema } from "@/lib/schemas/borrowBookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { z } from "zod";

type BorrowBookSchemaType = z.infer<typeof borrowBookSchema>;

export default function BorrowBookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const {
    isError,
    isLoading: isBookLoading,
    data: response,
  } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const book = response?.data;

  const form = useForm<BorrowBookSchemaType>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  async function onSubmit(values: BorrowBookSchemaType) {
    if (!book) return;

    if (values.quantity > book.copies) {
      form.setError("quantity", {
        type: "manual",
        message: `Cannot borrow more than the available ${book.copies} copies.`,
      });
      return;
    }

    try {
      const res = await borrowBook({
        book: book._id,
        quantity: values.quantity,
        dueDate: new Date(values.dueDate),
      }).unwrap();

      if (res.success) {
        toast.success("Book borrowed successfully!");
        navigate("/borrow-summary");
      }
    } catch (error) {
      toast.error("Failed to borrow the book!");
    }
  }

  if (isBookLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Borrow Book</h1>
      <div className="mb-6 p-4 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-semibold">{book?.title}</h2>
        <p className="text-sm text-gray-600 mt-2">by: {book?.author}</p>
        <p className="mt-2">
          Available Copies: <span className="font-bold">{book?.copies}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isBorrowing || book?.copies === 0}>
            {book?.copies === 0
              ? "Not available"
              : isBorrowing
              ? "Processing"
              : "Borrow Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
