'use client';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebase } from '.';

export async function uploadProductImages(userId: string, productId: string, files: File[]): Promise<string[]> {
    const { firebaseApp } = initializeFirebase();
    const storage = getStorage(firebaseApp);
    
    const uploadPromises = files.map(async (file, index) => {
        const filePath = `products/${userId}/${productId}/${file.name}-${index}`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    });

    return Promise.all(uploadPromises);
}
