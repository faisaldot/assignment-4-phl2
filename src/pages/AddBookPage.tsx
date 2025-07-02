import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";

import BookForm from "@/components/book-form";
import { useAddBookMutation } from "@/app/features/books/bookApi";
import { bookFormSchema } from "@/lib/schemas/bookFormSchema";

type BookFormSchemaType = z.infer<typeof bookFormSchema>;

export default function AddBookPage() {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const form = useForm<BookFormSchemaType>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  async function onSubmit(values: BookFormSchemaType) {
    try {
      const res = await addBook(values).unwrap();
      if (res.success) {
        toast.success("Book added successfully.");
        navigate("/books");
      }
    } catch (error) {
      toast.error("Failed to creating book.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <BookForm
        onSubmit={onSubmit}
        form={form}
        isLoading={isLoading}
        submitButtonText="Add Book"
      />
    </div>
  );
}
