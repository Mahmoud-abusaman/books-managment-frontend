import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, LogOut, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BookForm from "@/components/BookForm";

export interface Book {
  id: string;
  title: string;
  author: string;
  status: "interested" | "reading" | "finished";
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const statusColors = {
    interested: "bg-blue-100 text-blue-800",
    reading: "bg-yellow-100 text-yellow-800",
    finished: "bg-green-100 text-green-800",
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement your API call to fetch books
      console.log("Loading books...");
      
      // Mock data for demonstration
      const mockBooks: Book[] = [
        {
          id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          status: "finished",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: "user1"
        }
      ];
      
      setBooks(mockBooks);
    } catch (error) {
      toast({
        title: "Failed to load books",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      // TODO: Implement your API call to delete book
      console.log("Deleting book:", bookId);
      
      setBooks(books.filter(book => book.id !== bookId));
      toast({
        title: "Book deleted",
        description: "Book has been removed from your library",
      });
    } catch (error) {
      toast({
        title: "Failed to delete book",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      // TODO: Implement your logout API call here
      console.log("Logging out...");
      
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
      
      // TODO: Redirect to auth page
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleBookSaved = (savedBook: Book) => {
    if (editingBook) {
      setBooks(books.map(book => book.id === savedBook.id ? savedBook : book));
    } else {
      setBooks([savedBook, ...books]);
    }
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowBookForm(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading your books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Books</h1>
            <p className="text-muted-foreground">Manage your personal library</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddBook}>
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {books.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-semibold mb-2">No books yet</h3>
              <p className="text-muted-foreground mb-4">Start building your library by adding your first book</p>
              <Button onClick={handleAddBook}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Book
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>by {book.author}</CardDescription>
                    </div>
                    <Badge className={statusColors[book.status]}>
                      {book.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Added {new Date(book.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditBook(book)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {showBookForm && (
          <BookForm
            book={editingBook}
            onSave={handleBookSaved}
            onCancel={() => {
              setShowBookForm(false);
              setEditingBook(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;