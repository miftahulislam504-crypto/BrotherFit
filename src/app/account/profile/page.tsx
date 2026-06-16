'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile } from '@/services/userService';
import { profileSchema, type ProfileFormData } from '@/lib/schemas/auth';
import { auth, storage } from '@/lib/firebase/config';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Spinner } from '@/components/ui';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user }             = useAuth();
  const [uploading, setUploading] = useState(false);
  const [photoURL,  setPhotoURL]  = useState(user?.photoURL ?? '');
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name:  user.displayName ?? '',
        phone: '',
      });
      setPhotoURL(user.photoURL ?? '');
    }
  }, [user, reset]);

  /* ── Photo upload ───────────────────────────────────── */

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate — max 2MB, image only
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `users/${user.uid}/avatar`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser!, { photoURL: url });
      await updateUserProfile(user.uid, { photoURL: url });

      setPhotoURL(url);
      toast.success('Photo updated');
    } catch {
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  /* ── Profile update ─────────────────────────────────── */

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    try {
      await updateProfile(auth.currentUser!, { displayName: data.name });
      await updateUserProfile(user.uid, { name: data.name, phone: data.phone ?? '' });
      toast.success('Profile updated');
      reset(data); // Clear dirty state
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="pb-8 space-y-6">

      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-border ring-2 ring-border">
            {photoURL ? (
              <Image src={photoURL} alt="Profile" fill className="object-cover" sizes="80px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <span className="font-serif text-2xl text-primary">
                  {user?.displayName?.charAt(0)?.toUpperCase() ?? 'U'}
                </span>
              </div>
            )}
          </div>

          {/* Camera button */}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full
                       flex items-center justify-center shadow-card
                       hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {uploading ? <Spinner size="sm" className="border-white border-t-transparent" /> : <Camera size={13} className="text-white" />}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="text-center">
          <p className="font-serif text-lg text-primary">{user?.displayName}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted mt-0.5">
            <Mail size={11} />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="card p-4">
        <h2 className="font-serif text-base text-primary mb-4">Personal Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Full Name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="01XXXXXXXXX"
            helperText="Used for order updates"
            error={errors.phone?.message}
            {...register('phone')}
          />

          {/* Email — read only */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text">Email</label>
            <div className="input-field bg-bg text-muted cursor-not-allowed select-none">
              {user?.email}
            </div>
            <p className="text-xs text-muted">Email cannot be changed</p>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            disabled={!isDirty}
          >
            Save Changes
          </Button>
        </form>
      </div>

      {/* Account info */}
      <div className="card p-4">
        <h2 className="font-serif text-base text-primary mb-3">Account</h2>
        <div className="space-y-2">
          <InfoRow label="Member since" value={user?.metadata.creationTime ? new Date(user.metadata.creationTime).getFullYear().toString() : '—'} />
          <InfoRow label="Sign-in method" value={user?.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email'} />
        </div>
      </div>

    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}
