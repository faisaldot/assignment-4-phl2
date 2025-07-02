import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/app/features/books/bookApi";
import { bookFormSchema } from "@/lib/schemas/bookFormSchema";
import BookForm from "@/components/book-form";

type BookFromSchemaType = z.infer<typeof bookFormSchema>;

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading: isFetching,
    isError,
  } = useGetBookByIdQuery(id!);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const form = useForm<BookFromSchemaType>({
    resolver: zodResolver(bookFormSchema),
  });

  useEffect(() => {
    if (response?.data) {
      form.reset(response.data);
    }
  }, [response, form]);

  async function onSubmit(values: BookFromSchemaType) {
    if (!id) return;
    try {
      const res = await updateBook({ id, data: values }).unwrap();
      if (res.success) {
        toast.success("Book has been updated successfully.");
        navigate("/books");
      }
    } catch (error) {
      toast.error("Failed to update the book");
    }
  }

  if (isFetching) {
    return <div>Form loading...</div>;
  }

  if (isError) {
    return <div>Failed to edit book data</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm
        onSubmit={onSubmit}
        form={form}
        isLoading={isUpdating}
        submitButtonText="Update Book"
      />
    </div>
  );
}
