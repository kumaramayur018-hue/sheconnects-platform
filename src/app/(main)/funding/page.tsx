import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fundingOpportunities } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, ExternalLink, Globe, Target, Trophy } from 'lucide-react';

export default function FundingPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <Trophy className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline mt-4">Funding Opportunities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">Explore grants, loans, and other funding schemes to help grow your business.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundingOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{opportunity.title}</CardTitle>
              <CardDescription>by {opportunity.funder}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-muted-foreground text-sm line-clamp-3">{opportunity.description}</p>
              
              <div className="text-sm space-y-2">
                <div className="flex items-start gap-3">
                    <Target className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Eligibility</p>
                        <p className="text-muted-foreground">{opportunity.eligibility}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Deadline</p>
                        <p className="text-muted-foreground">{opportunity.deadline}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Region</p>
                        <p className="text-muted-foreground">{opportunity.region}</p>
                    </div>
                </div>
              </div>

               <div className="flex flex-wrap gap-2 pt-2">
                {opportunity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

            </CardContent>
            <CardFooter>
                <Link href={opportunity.applicationLink} target="_blank" className="w-full">
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply Now
                  </Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
