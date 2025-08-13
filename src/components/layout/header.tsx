import { Brain } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card-gradient shadow-subtle">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-medium">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">ZooZo</h1>
              <p className="text-sm text-muted-foreground -mt-1">Resume Reviewer</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            AI-Powered Resume Analysis
          </div>
        </div>
      </div>
    </header>
  );
};