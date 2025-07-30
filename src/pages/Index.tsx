import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Books Management System</h1>
        <p className="text-xl text-muted-foreground mb-8">Organize your personal library and track your reading progress</p>
        <div className="space-x-4">
          <Link to="/auth">
            <Button size="lg">Get Started</Button>
          </Link>
          {/* <Link to="/dashboard">
            <Button variant="outline" size="lg">View Dashboard</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
