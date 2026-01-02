import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trainingPrograms } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Languages, Users, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TrainingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Training & Capacity-Building</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="flex flex-col overflow-hidden">
            <div className="relative aspect-video w-full">
                <Image src={program.coverImage} alt={program.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="font-headline">{program.title}</CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary" className="capitalize">{program.level}</Badge>
                <Badge variant="outline" className="capitalize">{program.mode}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="text-sm text-muted-foreground space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Taught by {program.trainerName}</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  <span>Language: {program.language}</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{program.topics.length * 2} hours total</span>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{program.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/training/${program.id}`} className="w-full">
                  <Button className="w-full">View Program</Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
