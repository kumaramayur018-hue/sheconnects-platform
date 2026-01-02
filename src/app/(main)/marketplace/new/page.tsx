'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { productSchema, type ProductFormValues } from '@/lib/schemas';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/app/image-uploader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useUser, useFirestore } from '@/firebase';
import { uploadProductImages } from '@/firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const productAttributes = [
  { id: 'handmade', label: 'Handmade' },
  { id: 'eco-friendly', label: 'Eco-Friendly' },
  { id: 'rural_origin', label: 'Rural Origin' },
];

export default function NewProductPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      quantity: 1,
      images: [],
      shortDescription: '',
      longDescription: '',
      tags: '',
      attributes: [],
    },
  });

  async function onSubmit(data: ProductFormValues) {
    if (!user || !firestore) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to list a product.",
        });
        return;
    }

    setIsSubmitting(true);

    try {
      const productCollection = collection(firestore, 'products');
      const newDocRef = doc(productCollection); // create doc ref to get ID
      const productId = newDocRef.id;
      
      const imageUrls = await uploadProductImages(user.uid, productId, data.images);

      const productData = {
        id: productId,
        sellerId: user.uid,
        name: data.name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        images: imageUrls,
        coverImage: imageUrls[0] || '',
        tags: data.tags.split(',').map(tag => tag.trim()),
        attributes: data.attributes || [],
        rating: Math.floor(Math.random() * (5 - 3 + 1)) + 3, // Placeholder rating
        verificationStatus: 'pending',
      };
      
      await setDoc(newDocRef, productData);

      toast({
        title: 'Product Listed!',
        description: `Your product "${data.name}" has been submitted for review.`,
      });
      form.reset();
      router.push('/marketplace');
    } catch (error) {
        console.error("Error listing product:", error);
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Could not list your product. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          <div className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto text-primary" />
              <h1 className="text-3xl font-bold font-headline mt-4">List a New Product</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                  Fill out the details below to add your product to the marketplace. Your listing will be reviewed before it goes live.
              </p>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>Provide all the necessary information about your product.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                              control={form.control}
                              name="images"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Product Images</FormLabel>
                                      <FormControl>
                                          <ImageUploader 
                                            files={field.value} 
                                            onFilesChange={field.onChange}
                                            maxFiles={5}
                                            maxSize={5 * 1024 * 1024}
                                          />
                                      </FormControl>
                                      <FormDescription>
                                          Upload up to 5 images (JPG, PNG, WEBP). Max 5MB each. The first image will be the cover.
                                      </FormDescription>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel>Product Name</FormLabel>
                                      <FormControl>
                                          <Input placeholder="e.g., Handwoven Silk Scarf" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name="category"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel>Category</FormLabel>
                                      <FormControl>
                                          <Input placeholder="e.g., Apparel" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                              />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <FormField
                                  control={form.control}
                                  name="price"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel>Price (₹)</FormLabel>
                                      <FormControl>
                                          <Input type="number" step="0.01" placeholder="e.g., 2800.00" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                              />
                              <FormField
                                  control={form.control}
                                  name="quantity"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel>Available Quantity</FormLabel>
                                      <FormControl>
                                          <Input type="number" placeholder="e.g., 15" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                              />
                          </div>

                          <FormField
                              control={form.control}
                              name="shortDescription"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Short Description</FormLabel>
                                  <FormControl>
                                      <Textarea placeholder="A brief, catchy summary of your product." {...field} rows={2} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />

                          <FormField
                              control={form.control}
                              name="longDescription"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Long Description</FormLabel>
                                  <FormControl>
                                      <Textarea placeholder="Provide a detailed description of your product, its story, and materials." {...field} rows={5} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />

                          <FormField
                              control={form.control}
                              name="tags"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Tags</FormLabel>
                                  <FormControl>
                                      <Input placeholder="e.g., fashion, ethical, handwoven" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                      Comma-separated tags that help customers find your product.
                                  </FormDescription>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                          
                          <FormField
                              control={form.control}
                              name="attributes"
                              render={() => (
                                  <FormItem>
                                      <div className="mb-4">
                                          <FormLabel className="text-base">Product Attributes</FormLabel>
                                          <FormDescription>
                                              Select the attributes that best describe your product.
                                          </FormDescription>
                                      </div>
                                      {productAttributes.map((item) => (
                                          <FormField
                                          key={item.id}
                                          control={form.control}
                                          name="attributes"
                                          render={({ field }) => {
                                              return (
                                              <FormItem
                                                  key={item.id}
                                                  className="flex flex-row items-start space-x-3 space-y-0"
                                              >
                                                  <FormControl>
                                                  <Checkbox
                                                      checked={field.value?.includes(item.id)}
                                                      onCheckedChange={(checked) => {
                                                      return checked
                                                          ? field.onChange([...(field.value || []), item.id])
                                                          : field.onChange(
                                                              field.value?.filter(
                                                                  (value) => value !== item.id
                                                              )
                                                              )
                                                      }}
                                                  />
                                                  </FormControl>
                                                  <FormLabel className="font-normal">
                                                      {item.label}
                                                  </FormLabel>
                                              </FormItem>
                                              )
                                          }}
                                          />
                                      ))}
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />

                          <div className="flex justify-end">
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Listing Product...' : 'List Product'}
                              </Button>
                          </div>
                      </form>
                  </Form>
              </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
}