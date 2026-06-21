/**
 * Profile photos are stored as compressed base64 strings in the
 * user's Firestore document instead of Firebase Storage, since
 * Storage now requires the paid Blaze plan even for small usage.
 *
 * Note: this is NOT written to Firebase Auth's photoURL field —
 * that field has a hard 2048-character limit, far too small for
 * a base64 image. The Firestore `users/{uid}.photoURL` field has
 * no such limit (just the 1 MiB per-document ceiling).
 */

export function fileToCompressedBase64(
  file: File,
  maxWidth = 400,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas not supported')); return; }

        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
