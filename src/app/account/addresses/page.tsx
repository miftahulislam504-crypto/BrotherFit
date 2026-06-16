'use client';

import { useEffect, useState } from 'react';
import { Plus, MapPin, Star, Pencil, Trash2, X, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { getUserProfile, addAddress, deleteAddress, setDefaultAddress, updateAddress } from '@/services/userService';
import { DISTRICTS, getUpazilasForDistrict } from '@/data/bangladesh';
import { addressSchema, type AddressFormData } from '@/lib/schemas/auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { UserAddress } from '@/types';

export default function AddressesPage() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing,    setEditing]    = useState<UserAddress | null>(null);

  const loadAddresses = async () => {
    if (!user) return;
    const profile = await getUserProfile(user.uid);
    setAddresses(profile?.addresses ?? []);
    setLoading(false);
  };

  useEffect(() => { loadAddresses(); }, [user]);

  const openAdd  = () => { setEditing(null); setDrawerOpen(true); };
  const openEdit = (a: UserAddress) => { setEditing(a); setDrawerOpen(true); };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await deleteAddress(user.uid, id, addresses);
    toast.success('Address removed');
    loadAddresses();
  };

  const handleSetDefault = async (id: string) => {
    if (!user) return;
    await setDefaultAddress(user.uid, id, addresses);
    toast.success('Default address updated');
    loadAddresses();
  };

  const handleSave = async (data: AddressFormData) => {
    if (!user) return;
    if (editing) {
      await updateAddress(user.uid, editing.id, data, addresses);
      toast.success('Address updated');
    } else {
      await addAddress(user.uid, { ...data, isDefault: false }, addresses);
      toast.success('Address added');
    }
    setDrawerOpen(false);
    loadAddresses();
  };

  if (loading) {
    return (
      <div className="space-y-3 pb-6">
        {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
      </div>
    );
  }

  return (
    <>
      <div className="pb-6 space-y-3">

        {/* Add button */}
        <button
          onClick={openAdd}
          className="w-full card p-4 flex items-center gap-3 border-dashed
                     hover:border-accent transition-colors duration-200 text-left"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text">Add New Address</p>
            <p className="text-xs text-muted">Save delivery addresses for faster checkout</p>
          </div>
        </button>

        {/* Address cards */}
        {addresses.length === 0 ? (
          <div className="text-center py-10">
            <MapPin size={28} className="text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">No addresses saved yet</p>
          </div>
        ) : (
          addresses.map(addr => (
            <div key={addr.id} className={cn('card p-4', addr.isDefault && 'border-accent/40 bg-accent/5')}>
              {/* Label + default badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text uppercase tracking-wide">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="badge-accent text-[10px]">Default</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      title="Set as default"
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-accent/20 transition-colors"
                    >
                      <Star size={13} className="text-muted" />
                    </button>
                  )}
                  <button
                    onClick={() => openEdit(addr)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-border/60 transition-colors"
                  >
                    <Pencil size={13} className="text-muted" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-error/10 transition-colors"
                  >
                    <Trash2 size={13} className="text-error" />
                  </button>
                </div>
              </div>

              {/* Address details */}
              <p className="text-sm font-medium text-text">{addr.name}</p>
              <p className="text-xs text-muted">{addr.phone}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {addr.address}, {addr.area}, {addr.upazila}, {addr.district}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Address form drawer */}
      <AddressDrawer
        open={drawerOpen}
        editing={editing}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

/* ── Address drawer ──────────────────────────────────────── */

function AddressDrawer({
  open,
  editing,
  onClose,
  onSave,
}: {
  open: boolean;
  editing: UserAddress | null;
  onClose: () => void;
  onSave: (data: AddressFormData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: editing ?? {},
  });

  useEffect(() => {
    reset(editing ?? {});
  }, [editing, reset]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const district  = watch('district');
  const upazilas  = getUpazilasForDistrict(district);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-3xl max-h-[92vh] overflow-y-auto pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-serif text-lg text-primary">
                {editing ? 'Edit Address' : 'Add Address'}
              </h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-border/60">
                <X size={16} className="text-text" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSave)} className="px-5 pt-4 pb-6 space-y-4" noValidate>
              <Input label="Label (e.g. Home, Office)" placeholder="Home" required error={errors.label?.message} {...register('label')} />
              <Input label="Full Name" placeholder="Recipient name" required error={errors.name?.message} {...register('name')} />
              <Input label="Phone" type="tel" placeholder="01XXXXXXXXX" required error={errors.phone?.message} {...register('phone')} />

              {/* District */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">District <span className="text-error">*</span></label>
                <select {...register('district')} className={`input-field ${errors.district ? 'input-error' : ''}`} defaultValue="">
                  <option value="" disabled>Select district</option>
                  {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name} ({d.division})</option>)}
                </select>
                {errors.district && <p className="text-xs text-error">{errors.district.message}</p>}
              </div>

              {/* Upazila */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">Upazila <span className="text-error">*</span></label>
                <select {...register('upazila')} disabled={!district} className={`input-field disabled:opacity-50 ${errors.upazila ? 'input-error' : ''}`} defaultValue="">
                  <option value="" disabled>{district ? 'Select upazila' : 'Select district first'}</option>
                  {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                {errors.upazila && <p className="text-xs text-error">{errors.upazila.message}</p>}
              </div>

              <Input label="Area / Village" placeholder="Your area or village" required error={errors.area?.message} {...register('area')} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text">Full Address <span className="text-error">*</span></label>
                <textarea {...register('address')} rows={2} placeholder="House no., road, landmark..." className={`input-field resize-none ${errors.address ? 'input-error' : ''}`} />
                {errors.address && <p className="text-xs text-error">{errors.address.message}</p>}
              </div>

              <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                {editing ? 'Update Address' : 'Save Address'}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
