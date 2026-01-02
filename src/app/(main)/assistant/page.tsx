'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Bot, BookOpen } from 'lucide-react';
import { getBusinessAdvice } from '@/ai/flows/business-advisor-flow';
import { currentUser } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// A simple markdown-to-HTML renderer
const Markdown = ({ content }: { content: string }) => {
    const html = content
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/\n- (.*)/g, '<ul class="list-disc list-inside my-2"><li>$1</li></ul>') // Naive list
      .replace(/<\/ul>\n<ul class="list-disc list-inside my-2">/g, '') // Merge lists
      .replace(/\n/g, '<br />');
  
    return <div className="prose prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: html }} />;
};


export default function AssistantPage() {
    const [question, setQuestion] = useState('');
    const [advice, setAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleAsk = async () => {
        if (!question) return;

        setIsLoading(true);
        setAdvice('');

        try {
            // This is a placeholder for a real implementation that would store the question.
            // For now, we simulate a response from a mentor/admin.
            setTimeout(() => {
                const simulatedAnswer = `Thank you for your question: "${question}" \n\nA mentor or admin will review your question and provide a detailed answer here shortly. In the meantime, you might find our training program on "Digital Marketing for Beginners" helpful.`;
                setAdvice(simulatedAnswer);
                setIsLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Error submitting question:", error);
            setAdvice("Sorry, I encountered an error and couldn't submit your question. Please try again.");
             setIsLoading(false);
        }
    };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
            <BookOpen className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-3xl font-bold font-headline">Business Q&A</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Have a question about your business? Ask our community of mentors and experts. Submit your question, and it will be answered by an experienced professional.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>
                Describe a challenge or ask for advice about your business. For example: &quot;How can I market my handmade jewelry to a wider audience?&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
                placeholder="Type your business question here..." 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                disabled={isLoading}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleAsk} disabled={isLoading || !question}>
                {isLoading ? 'Submitting...' : 'Submit Question'}
            </Button>
          </CardFooter>
        </Card>

        {(isLoading || advice) && (
            <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    <CardTitle>Response</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ) : (
                       <Markdown content={advice} />
                    )}
                </CardContent>
            </Card>
        )}

      </div>
    </div>
  );
}
