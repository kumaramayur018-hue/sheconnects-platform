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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { currentUser, posts } from '@/lib/data';
import { Mail, MapPin, UserPlus, Edit, Award, MoreHorizontal, Heart, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const userPosts = posts.filter(p => p.authorId === currentUser.id);

  return (
    <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="relative h-48 w-full bg-muted">
            <Image src={currentUser.coverPhoto} alt="Cover photo" fill className="object-cover" data-ai-hint="abstract pattern" />
            <div className="absolute top-4 right-4">
              <Button variant="secondary" size="icon"><Edit className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="p-6 pt-0 -mt-16">
            <div className="flex items-end gap-4 flex-wrap">
              <Avatar className="h-32 w-32 border-4 border-card">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow pb-2">
                <h1 className="text-3xl font-bold font-headline">{currentUser.name}</h1>
                <p className="text-muted-foreground">{currentUser.headline}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{currentUser.location}</span>
                </div>
              </div>
              <div className="flex gap-2 pb-2">
                <Button><UserPlus className="mr-2 h-4 w-4" /> Connect</Button>
                <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Message</Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="about" className="w-full">
          <Card>
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>
          </Card>
          <TabsContent value="about" className="mt-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-xl">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">{currentUser.bio}</p>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentUser.interests.map(interest => <Badge key={interest} variant="secondary">{interest}</Badge>)}
                        </div>
                      </div>
                  </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="activity" className="mt-6 space-y-6">
            {userPosts.map(post => <PostCard key={post.id} post={post} />)}
            {userPosts.length === 0 && (
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground text-center">No activity to show yet.</p>
                    </CardContent>
                </Card>
            )}
          </TabsContent>
          <TabsContent value="badges" className="mt-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-xl">Badges & Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-4">
                      {currentUser.badges.map(badge => (
                          <div key={badge} className="flex flex-col items-center text-center gap-2 p-4 border rounded-lg w-32">
                              <Award className="h-10 w-10 text-yellow-500" />
                              <p className="text-sm font-medium">{badge}</p>
                          </div>
                      ))}
                      {currentUser.badges.length === 0 && (
                          <p className="text-muted-foreground">No badges earned yet. Keep engaging!</p>
                      )}
                  </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="connections" className="mt-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-xl">{currentUser.connections.length} Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">A list of user connections will appear here.</p>
                  </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
    </div>
  );
}


function PostCard({ post }: { post: (typeof posts)[0] }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
            <Link href="/profile">
              <Avatar>
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
                <Link href="/profile"><p className="font-semibold hover:underline">{currentUser.name}</p></Link>
                <p className="text-xs text-muted-foreground">{currentUser.headline} &middot; {post.createdAt}</p>
            </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <p className="mb-4 text-sm">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image src={post.imageUrl} alt="Post image" fill className="object-cover" data-ai-hint="conference event" />
          </div>
        )}
      </CardContent>
      <CardContent className="p-2 flex justify-between items-center text-sm text-muted-foreground border-t mt-4">
        <div className="flex">
            <Button variant="ghost" className="flex items-center gap-2 hover:text-primary rounded-md">
                <Heart className="h-5 w-5" />
                <span className="text-xs">Like ({post.likes})</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 hover:text-primary rounded-md">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Comment ({post.comments})</span>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
