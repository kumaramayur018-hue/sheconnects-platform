import { notFound } from 'next/navigation';
import { trainingPrograms, trainingSessions } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Languages, Users, Tag, Calendar, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function TrainingProgramPage({ params }: { params: { programId: string } }) {
  const program = trainingPrograms.find((p) => p.id === params.programId);
  const sessions = trainingSessions.filter((s) => s.programId === params.programId);

  if (!program) {
    notFound();
  }

  return (
    <div className="space-y-8">
      
      <Card className="overflow-hidden">
        <div className="relative aspect-[16/7] w-full">
            <Image src={program.coverImage} alt={program.title} fill className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-4xl font-bold font-headline text-white">{program.title}</h1>
                <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="capitalize bg-white/20 text-white border-none">{program.level}</Badge>
                    <Badge variant="outline" className="capitalize bg-white/20 text-white border-none">{program.mode}</Badge>
                </div>
             </div>
        </div>
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold font-headline mb-2">About this Program</h2>
                    <p className="text-muted-foreground">{program.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                     <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Taught by</p>
                            <p className="text-muted-foreground">{program.trainerName}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Language</p>
                            <p className="text-muted-foreground">{program.language}</p>
                        </div>
                    </div>
                    <Button className="w-full" size="lg">Enroll in Program</Button>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Program Sessions</h2>
        <div className="space-y-4">
            {sessions.map((session, index) => (
                <Card key={session.id} className="flex flex-col md:flex-row items-stretch">
                   <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full rounded-l-lg md:rounded-l-lg"
                            src={session.recordingUrl}
                            title={session.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                         </iframe>
                   </div>
                   <div className="md:w-2/3 p-6 flex flex-col">
                        <p className="text-sm text-muted-foreground mb-1">Session {index + 1}</p>
                        <h3 className="font-bold text-xl font-headline mb-2">{session.title}</h3>
                        <p className="text-muted-foreground text-sm flex-grow mb-4">{session.description}</p>
                        <div className="flex items-center justify-between">
                            <Button variant="outline">Download Resources</Button>
                            <Button variant="ghost" className="text-green-600 hover:text-green-700">
                                <CheckCircle className="mr-2 h-4 w-4"/>
                                Mark as Completed
                            </Button>
                        </div>
                   </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
