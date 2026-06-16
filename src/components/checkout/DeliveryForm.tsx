'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliverySchema, type DeliveryFormData } from '@/lib/schemas/checkout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { DISTRICTS, getUpazilasForDistrict, getDeliveryFee, getDistrictName } from '@/data/bangladesh';
import { formatPrice } from '@/lib/utils';
import { Truck } from 'lucide-react';

interface DeliveryFormProps {
  defaultValues?: Partial<DeliveryFormData>;
  onSubmit: (data: DeliveryFormData, charge: number) => void;
  onBack: () => void;
}

export default function DeliveryForm({ defaultValues, onSubmit, onBack }: DeliveryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues,
  });

  const selectedDistrict = watch('district');
  const upazilas = getUpazilasForDistrict(selectedDistrict);
  const deliveryFee = selectedDistrict ? getDeliveryFee(selectedDistrict) : null;

  const handleFormSubmit = (data: DeliveryFormData) => {
    onSubmit(data, getDeliveryFee(data.district));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>

      {/* District */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">
          District <span className="text-error">*</span>
        </label>
        <select
          {...register('district')}
          className={`input-field ${errors.district ? 'input-error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>Select district</option>
          {['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'].map(division => (
            <optgroup key={division} label={`— ${division} Division`}>
              {DISTRICTS.filter(d => d.division === division).map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.district && <p className="text-xs text-error">{errors.district.message}</p>}
      </div>

      {/* Upazila */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">
          Upazila / Thana <span className="text-error">*</span>
        </label>
        <select
          {...register('upazila')}
          disabled={!selectedDistrict}
          className={`input-field disabled:opacity-50 disabled:cursor-not-allowed ${errors.upazila ? 'input-error' : ''}`}
          defaultValue=""
        >
          <option value="" disabled>
            {selectedDistrict ? 'Select upazila' : 'Select district first'}
          </option>
          {upazilas.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        {errors.upazila && <p className="text-xs text-error">{errors.upazila.message}</p>}
      </div>

      {/* Area */}
      <Input
        label="Area / Village"
        placeholder="Your area, village or road"
        required
        error={errors.area?.message}
        {...register('area')}
      />

      {/* Full address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">
          Full Address <span className="text-error">*</span>
        </label>
        <textarea
          {...register('address')}
          placeholder="House no., road, landmark..."
          rows={3}
          className={`input-field resize-none ${errors.address ? 'input-error' : ''}`}
        />
        {errors.address && <p className="text-xs text-error">{errors.address.message}</p>}
      </div>

      {/* Delivery charge chip */}
      {deliveryFee !== null && (
        <div className="flex items-center justify-between bg-accent/10 border border-accent/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Truck size={15} className="text-accent" />
            <span className="text-sm text-text">
              Delivery to {getDistrictName(selectedDistrict)}
            </span>
          </div>
          <span className="font-mono font-semibold text-primary text-sm">
            {formatPrice(deliveryFee)}
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" size="lg">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
