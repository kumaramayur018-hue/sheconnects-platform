'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { products, users } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useUser, useCollection, useFirestore } from '@/firebase';
import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemoFirebase } from '@/firebase/provider';
import type { Product } from '@/lib/data';

function ProductRating({ rating, count }: { rating: number; count?: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="h-4 w-4 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      {count && <span className="text-xs text-muted-foreground ml-1">({count})</span>}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
    const firestore = useFirestore();
    const sellerQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'users'), where('id', '==', product.sellerId));
    }, [firestore, product.sellerId]);
    const { data: sellerData } = useCollection(sellerQuery);
    const entrepreneur = sellerData?.[0] || users.find(u => u.id === product.sellerId);

    return (
        <Card className="flex flex-col overflow-hidden">
            <div className="relative aspect-square w-full">
                <Image 
                    src={product.coverImage || "https://picsum.photos/seed/placeholder/400/400"} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                    data-ai-hint="product photo" 
                />
            </div>
            <CardHeader>
                <CardTitle className="font-headline text-lg truncate">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground h-5">
                    {entrepreneur ? (
                        <>
                            By <Link href="/profile" className="text-primary hover:underline">{entrepreneur.name}</Link>
                        </>
                    ) : (
                       <Skeleton className="h-4 w-1/2" />
                    )}
                </p>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">₹{product.price.toFixed(2)}</p>
                    <ProductRating rating={product.rating} />
                </div>
                <div className="mt-2 flex flex-wrap gap-1 h-5">
                    {product.attributes.map(attr => (
                        <Badge key={attr} variant="secondary" className="text-xs capitalize">{attr.replace(/_/g, ' ')}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add to Cart</Button>
            </CardFooter>
        </Card>
    );
}


export default function MarketplacePage() {
    const firestore = useFirestore();

    const productsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'products');
    }, [firestore]);

    const { data: liveProducts, isLoading } = useCollection<Product>(productsQuery);

    const displayProducts = liveProducts && liveProducts.length > 0 ? liveProducts : products;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-headline">Marketplace</h1>
                <Link href="/marketplace/new">
                    <Button>List a Product</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading && Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="flex flex-col overflow-hidden">
                        <Skeleton className="aspect-square w-full" />
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                                <Skeleton className="h-5 w-1/4" />
                                <Skeleton className="h-5 w-1/4" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
                {!isLoading && displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}