import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { users, currentUser } from '@/lib/data';
import { Mail, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

function getRecommendedConnections() {
    const myInterests = new Set(currentUser.interests);
    return users.filter(user => {
        if (user.id === currentUser.id || currentUser.connections.includes(user.id)) {
            return false;
        }
        const userInterests = new Set(user.interests);
        const intersection = new Set([...myInterests].filter(i => userInterests.has(i)));
        return intersection.size > 0;
    });
}

function getRecommendedMentors() {
    return users.filter(user => {
        return user.role === 'mentor' && user.id !== currentUser.id && !currentUser.connections.includes(user.id);
    });
}


export default async function ConnectionsPage() {
    const myConnections = users.filter(user => currentUser.connections.includes(user.id));
    const recommended = getRecommendedConnections();
    const mentors = getRecommendedMentors();
  
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">My Network</h1>
      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
          <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="connections" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myConnections.map(user => <UserCard key={user.id} user={user} />)}
            {myConnections.length === 0 && <p className="text-muted-foreground col-span-full">You haven't made any connections yet.</p>}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommended.map(user => <UserCard key={user.id} user={user} suggested />)}
            </div>
            {recommended.length === 0 && <p className="text-muted-foreground">No recommendations right now. Try adding more interests to your profile!</p>}
        </TabsContent>
         <TabsContent value="mentors" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mentors.map(user => <UserCard key={user.id} user={user} suggested />)}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserCard({ user, suggested = false }: { user: (typeof users)[0], suggested?: boolean }) {
  return (
    <Card className="text-center">
      <CardContent className="p-6">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link href="/profile">
            <p className="font-semibold font-headline text-lg hover:text-primary">{user.name}</p>
        </Link>
        <p className="text-sm text-muted-foreground truncate">{user.headline}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {suggested ? (
            <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Connect
            </Button>
        ) : (
            <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Message
            </Button>
        )}
      </CardFooter>
    </Card>
  )
}
