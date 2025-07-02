import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/app/features/books/bookApi";
import { bookFormSchema } from "@/lib/schemas/bookFormSchema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";

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
      const res = await updateBook({ id, data: values });
      if (res.data?.success) {
        toast.success("Book has been updated successfully.");
        navigate("/books");
      }
    } catch (error) {
      toast.error("Failed to update the book");
    }
  }

  if (isFetching) {
    return <div>Editing form...</div>;
  }

  if (isError) {
    return <div>Failed to load book data</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating" : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
