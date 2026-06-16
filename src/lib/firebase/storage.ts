import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './config';

/** Upload a single image, returns download URL */
export async function uploadImage(
  path: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(ref(storage, path), file);

    task.on(
      'state_changed',
      snap => {
        onProgress?.((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      reject,
      async () => {
        resolve(await getDownloadURL(task.snapshot.ref));
      }
    );
  });
}

/** Upload multiple images in parallel */
export async function uploadImages(
  folder: string,
  files: File[],
  onProgress?: (pct: number) => void
): Promise<string[]> {
  let done = 0;
  return Promise.all(
    files.map(file =>
      uploadImage(
        `${folder}/${Date.now()}-${file.name}`,
        file,
        () => { done++; onProgress?.((done / files.length) * 100); }
      )
    )
  );
}

/** Delete an image by full storage path */
export async function deleteImage(path: string): Promise<void> {
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // Ignore "not found" errors
  }
}

/** Build a storage path */
export function storagePath(folder: string, filename: string): string {
  const ext  = filename.split('.').pop() ?? 'jpg';
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  return `${folder}/${name}`;
}

/** Validate file before upload */
export function validateImageFile(
  file: File,
  maxMB = 5
): { valid: boolean; error?: string } {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }
  if (file.size > maxMB * 1024 * 1024) {
    return { valid: false, error: `Image must be under ${maxMB}MB` };
  }
  return { valid: true };
}
