'use client';

import { UploadCloud, X, GripVertical } from 'lucide-react';
import React, { useCallback, useRef } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDrag, useDrop, type XYCoord } from 'react-dnd';

interface ImageUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
}

export function ImageUploader({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  accept = { 'image/png': [], 'image/jpeg': [], 'image/webp': [] },
}: ImageUploaderProps) {
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          errors.forEach((err: any) => {
             toast({
              variant: 'destructive',
              title: 'Upload Error',
              description: err.message,
            });
          });
        });
        return;
      }
      
      const newFiles = [...files, ...acceptedFiles];
      if (newFiles.length > maxFiles) {
        toast({
          variant: 'destructive',
          title: 'Too many files',
          description: `You can only upload a maximum of ${maxFiles} images.`,
        });
        return;
      }
      onFilesChange(newFiles);
    },
    [files, onFilesChange, maxFiles, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
  });
  
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const moveFile = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragFile = files[dragIndex];
    const newFiles = [...files];
    newFiles.splice(dragIndex, 1);
    newFiles.splice(hoverIndex, 0, dragFile);
    onFilesChange(newFiles);
  }, [files, onFilesChange]);


  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
            "flex aspect-video w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 text-center text-muted-foreground transition-colors",
            isDragActive && "border-primary bg-primary/10 text-primary",
            "hover:border-primary hover:bg-primary/10 hover:text-primary cursor-pointer"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mb-2 h-8 w-8" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop images here, or click to select</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, index) => (
             <FilePreviewCard 
                key={`${file.name}-${index}`}
                file={file}
                index={index}
                onRemove={() => removeFile(index)}
                onMove={moveFile}
             />
          ))}
        </div>
      )}
    </div>
  );
}

interface FilePreviewCardProps {
    file: File;
    index: number;
    onRemove: () => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}


const FilePreviewCard = ({ file, index, onRemove, onMove }: FilePreviewCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<{ index: number; }, void, { handlerId: any }>({
        accept: 'image',
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() };
        },
        hover(item: { index: number }, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

            onMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: 'image',
        item: () => ({ index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    preview(drop(ref));

    return (
        <div 
            ref={ref}
            data-handler-id={handlerId}
            className={cn(
                "relative group aspect-square overflow-hidden rounded-md border",
                isDragging && "opacity-50"
            )}
        >
            <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
                onLoad={() => URL.revokeObjectURL(file.name)}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div 
                ref={drag}
                className="absolute top-1 left-1 p-1 text-white cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="h-5 w-5" />
            </div>

            <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onRemove}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-xs text-white truncate">
                {file.name}
            </div>
            {index === 0 && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                    Cover
                </div>
            )}
        </div>
    )
}
