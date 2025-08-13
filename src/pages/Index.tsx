import { useState } from "react";
import { Header } from "@/components/layout/header";
import { UploadZone } from "@/components/ui/upload-zone";
import { ScoreCard } from "@/components/analysis/score-card";
import { FeedbackList, FeedbackItem } from "@/components/analysis/feedback-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Target, Clock, Zap, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResults {
  atsScore: number;
  keywordScore: number;
  readabilityScore: number;
  overallScore: number;
  feedback: FeedbackItem[];
  keywordGaps: string[];
  processingTime: number;
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    toast({
      title: "Resume uploaded successfully",
      description: `${file.name} is ready for analysis`,
    });
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast({
        title: "No resume uploaded",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please paste the job description for better analysis",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: AnalysisResults = {
      atsScore: 85,
      keywordScore: 72,
      readabilityScore: 88,
      overallScore: 82,
      processingTime: 1.8,
      keywordGaps: ["machine learning", "cloud computing", "agile methodology"],
      feedback: [
        {
          id: "1",
          type: "warning",
          title: "Missing Keywords",
          description: "Add 'machine learning' and 'cloud computing' to your skills section",
          priority: "high"
        },
        {
          id: "2", 
          type: "error",
          title: "Date Inconsistency",
          description: "Employment dates are inconsistent in the Experience section",
          priority: "high"
        },
        {
          id: "3",
          type: "info",
          title: "Optimize Section Headers",
          description: "Use standard headers like 'Professional Experience' instead of 'Work History'",
          priority: "medium"
        },
        {
          id: "4",
          type: "success",
          title: "Great Contact Information",
          description: "All essential contact details are present and well-formatted",
          priority: "low"
        }
      ]
    };
    
    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: `Your resume scored ${mockResults.overallScore}% overall`,
    });
  };

  return (
    <div className="min-h-screen bg-subtle-gradient">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Get Your Resume <span className="text-primary">ATS-Ready</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and job description to get instant feedback on ATS compatibility, 
            keyword optimization, and readability
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadZone onFileSelect={handleFileUpload} />
                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">
                        {uploadedFile.name}
                      </span>
                      <Badge variant="secondary" className="ml-auto">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here for keyword analysis..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {jobDescription.length}/5000 characters
                  </p>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!uploadedFile || !jobDescription.trim() || isAnalyzing}
                    className="bg-primary-gradient hover:shadow-glow transition-all duration-300"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResults ? (
              <>
                {/* Overall Score */}
                <Card className="shadow-large bg-card-gradient">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Overall Score</CardTitle>
                    <div className="text-4xl font-bold text-primary">
                      {analysisResults.overallScore}%
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        Analyzed in {analysisResults.processingTime}s
                      </span>
                    </div>
                  </CardHeader>
                </Card>

                {/* Score Breakdown */}
                <div className="grid gap-4">
                  <ScoreCard
                    title="ATS Compatibility"
                    score={analysisResults.atsScore}
                    maxScore={100}
                    description="How well your resume passes through ATS systems"
                  />
                  <ScoreCard
                    title="Keyword Match"
                    score={analysisResults.keywordScore}
                    maxScore={100}
                    description="Relevance to the job description keywords"
                  />
                  <ScoreCard
                    title="Readability"
                    score={analysisResults.readabilityScore}
                    maxScore={100}
                    description="Grammar, spelling, and overall clarity"
                  />
                </div>

                {/* Missing Keywords */}
                {analysisResults.keywordGaps.length > 0 && (
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle>Missing Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.keywordGaps.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Feedback */}
                <Card className="shadow-medium">
                  <CardContent className="pt-6">
                    <FeedbackList items={analysisResults.feedback} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-medium">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Upload your resume and paste a job description to get started
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;