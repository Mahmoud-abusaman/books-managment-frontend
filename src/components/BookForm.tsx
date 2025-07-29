import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Book } from "@/pages/Dashboard";

interface BookFormProps {
  book?: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const BookForm = ({ book, onSave, onCancel }: BookFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    status: book?.status || "interested" as const,
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement your API call to create/update book
      console.log(book ? "Updating book:" : "Creating book:", formData);
      
      const savedBook: Book = {
        id: book?.id || Date.now().toString(),
        title: formData.title,
        author: formData.author,
        status: formData.status,
        created_at: book?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: book?.user_id || "current_user_id",
      };

      onSave(savedBook);
      toast({
        title: book ? "Book updated" : "Book added",
        description: `"${formData.title}" has been ${book ? "updated" : "added to your library"}`,
      });
    } catch (error) {
      toast({
        title: book ? "Failed to update book" : "Failed to add book",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{book ? "Edit Book" : "Add New Book"}</DialogTitle>
          <DialogDescription>
            {book ? "Update your book information" : "Add a new book to your library"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter book title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (book ? "Update Book" : "Add Book")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;