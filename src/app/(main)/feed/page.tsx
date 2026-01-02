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
  CardTitle
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { currentUser, posts, users, suggestedConnections } from '@/lib/data';
import { Heart, MessageCircle, MoreHorizontal, UserPlus, Send, ImageIcon } from 'lucide-react';
import Link from 'next/link';

function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export default function FeedPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <div className="md:col-span-3 space-y-6 hidden md:block">
        <ProfileSummaryCard />
      </div>
      <div className="md:col-span-6 space-y-6">
        <CreatePostCard />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="md:col-span-3 space-y-6 hidden md:block">
        <SuggestedConnectionsCard />
      </div>
    </div>
  );
}

function ProfileSummaryCard() {
    return (
        <Card className="overflow-hidden text-center">
            <div className="relative h-20 w-full">
                <Image src={currentUser.coverPhoto} alt="Cover photo" fill className="object-cover" data-ai-hint="abstract pattern" />
            </div>
            <CardContent className="p-4 pt-0 -mt-10">
                <Link href="/profile">
                    <Avatar className="h-20 w-20 border-4 border-card mx-auto mb-2">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
                 <Link href="/profile">
                    <p className="font-semibold text-lg hover:underline">{currentUser.name}</p>
                 </Link>
                <p className="text-sm text-muted-foreground">{currentUser.headline}</p>
            </CardContent>
            <CardFooter className="flex-col text-sm border-t p-4 space-y-2">
                <Link href="/connections" className="w-full flex justify-between items-center text-muted-foreground hover:text-foreground">
                    <span>Connections</span>
                    <span className="text-primary font-semibold">{currentUser.connections.length}</span>
                </Link>
                 <Link href="/profile" className="w-full flex justify-between items-center text-muted-foreground hover:text-foreground">
                    <span>View Profile</span>
                </Link>
            </CardFooter>
        </Card>
    );
}

function CreatePostCard() {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`} className="bg-background border-none focus-visible:ring-0 text-base" rows={2}/>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button variant="ghost" size="icon">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button>
            <Send className="mr-2 h-4 w-4" />
            Post
        </Button>
      </CardFooter>
    </Card>
  );
}

function PostCard({ post }: { post: (typeof posts)[0] }) {
  const author = getUserById(post.authorId);
  if (!author) return null;

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
            <Link href="/profile">
              <Avatar>
                  <AvatarImage src={author.avatar} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
                <Link href="/profile"><p className="font-semibold hover:underline">{author.name}</p></Link>
                <p className="text-xs text-muted-foreground">{author.headline} &middot; {post.createdAt}</p>
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
      <CardFooter className="p-2 flex justify-between items-center text-sm text-muted-foreground border-t mt-4">
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
      </CardFooter>
    </Card>
  );
}

function SuggestedConnectionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold">Grow Your Network</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {suggestedConnections.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                        <Link href="/profile" className="flex items-center gap-3 group">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold group-hover:underline">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.headline}</p>
                            </div>
                        </Link>
                        <Button variant="outline" size="sm" className="rounded-full">
                            <UserPlus className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="border-t">
                <Link href="/connections" className="w-full">
                    <Button variant="ghost" className="w-full text-primary hover:text-primary">View All</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
