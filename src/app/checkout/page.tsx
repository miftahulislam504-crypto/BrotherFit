'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, MapPin, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import SiteLayout from '@/components/layout/SiteLayout';
import StepIndicator from '@/components/checkout/StepIndicator';
import CustomerForm from '@/components/checkout/CustomerForm';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummaryMini from '@/components/checkout/OrderSummaryMini';
import { Skeleton } from '@/components/ui';

import { useAuth } from '@/hooks/useAuth';
import { getUserProfile } from '@/services/userService';
import { createOrder } from '@/services/orderService';
import { useCartStore } from '@/store/cartStore';
import { getDeliveryFee, getDistrictName } from '@/data/bangladesh';

import type { CustomerFormData, DeliveryFormData, PaymentFormData } from '@/lib/schemas/checkout';
import type { UserAddress, OrderItem } from '@/types';

function CheckoutContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const items      = useCartStore(s => s.items);
  const totalPrice = useCartStore(s => s.totalPrice());
  const clearCart  = useCartStore(s => s.clearCart);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customerData, setCustomerData]   = useState<CustomerFormData | null>(null);
  const [deliveryData, setDeliveryData]   = useState<DeliveryFormData | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [profileLoading, setProfileLoading]   = useState(true);
  const [customerDefaults, setCustomerDefaults] = useState<Partial<CustomerFormData>>();
  const [savedAddresses, setSavedAddresses]     = useState<UserAddress[]>([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // Prefill from the signed-in user's profile + saved address book, if any.
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setProfileLoading(false); return; }

    (async () => {
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setCustomerDefaults({
            name: profile.name ?? '',
            phone: profile.phone ?? '',
            email: profile.email ?? '',
          });
          setSavedAddresses(profile.addresses ?? []);
        }
      } finally {
        setProfileLoading(false);
      }
    })();
  }, [user, authLoading]);

  const useSavedAddress = (addr: UserAddress) => {
    setCustomerData(prev => ({
      name: prev?.name || addr.name,
      phone: prev?.phone || addr.phone,
      email: prev?.email ?? '',
    }));
    setDeliveryData({
      district: addr.district,
      upazila: addr.upazila,
      area: addr.area,
      address: addr.address,
    });
    setDeliveryCharge(getDeliveryFee(addr.district));
    setStep(3);
  };

  const handlePlaceOrder = async (paymentData: PaymentFormData) => {
    if (!customerData || !deliveryData) return;
    setPlacing(true);

    try {
      const orderItems: OrderItem[] = items.map(i => ({
        productId: i.productId,
        productName: i.productName,
        productImage: i.productImage,
        variantId: i.variantId,
        size: i.size,
        color: i.color,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      }));

      const subtotal = totalPrice;
      const total = subtotal + deliveryCharge;

      const orderId = await createOrder({
        ...(user?.uid ? { userId: user.uid } : {}),
        status: 'pending',
        items: orderItems,
        subtotal,
        deliveryCharge,
        discount: 0,
        total,
        address: {
          name: customerData.name,
          phone: customerData.phone,
          district: deliveryData.district,
          upazila: deliveryData.upazila,
          area: deliveryData.area,
          address: deliveryData.address,
        },
        paymentMethod: paymentData.method,
      });

      clearCart();
      toast.success('Order placed!');
      router.push(`/ordar-confirmed/${orderId}`);
    } catch (err) {
      console.error('Failed to place order:', err);
      toast.error('Could not place your order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  // ── Empty cart guard ───────────────────────────────────────
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-border/60 flex items-center justify-center mb-4">
          <ShoppingBag size={32} className="text-muted" />
        </div>
        <h2 className="font-serif text-2xl text-primary">Your cart is empty</h2>
        <p className="text-sm text-muted mt-2 max-w-xs">
          Add something to your cart before checking out.
        </p>
        <Link href="/products" className="btn-primary mt-6">
          Browse Products
        </Link>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="mt-4 space-y-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mt-4 pb-6">
      <h1 className="font-serif text-2xl text-primary">Checkout</h1>

      <StepIndicator currentStep={step} />

      <OrderSummaryMini
        items={items}
        subtotal={totalPrice}
        deliveryCharge={deliveryCharge}
      />

      {/* Step 1 — Customer info */}
      {step === 1 && (
        <CustomerForm
          defaultValues={customerData ?? customerDefaults}
          onSubmit={(data) => { setCustomerData(data); setStep(2); }}
        />
      )}

      {/* Step 2 — Delivery address */}
      {step === 2 && (
        <div className="space-y-4">
          {savedAddresses.length > 0 && !showNewAddressForm ? (
            <div className="space-y-3">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <h3 className="text-sm font-medium text-text">Saved Addresses</h3>

              {savedAddresses.map(addr => (
                <button
                  key={addr.id}
                  onClick={() => useSavedAddress(addr)}
                  className="w-full card p-4 text-left flex items-start gap-3 hover:border-accent transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-text uppercase tracking-wide">
                        {addr.label}
                      </span>
                      {addr.isDefault && <span className="badge-accent text-[10px]">Default</span>}
                    </div>
                    <p className="text-sm text-text mt-1">{addr.name} · {addr.phone}</p>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">
                      {addr.address}, {addr.area}, {addr.upazila}, {getDistrictName(addr.district)}
                    </p>
                  </div>
                </button>
              ))}

              <button
                onClick={() => setShowNewAddressForm(true)}
                className="text-sm text-primary underline underline-offset-2"
              >
                + Use a different address
              </button>
            </div>
          ) : (
            <DeliveryForm
              defaultValues={deliveryData ?? undefined}
              onSubmit={(data, charge) => { setDeliveryData(data); setDeliveryCharge(charge); setStep(3); }}
              onBack={() => (showNewAddressForm && savedAddresses.length > 0) ? setShowNewAddressForm(false) : setStep(1)}
            />
          )}
        </div>
      )}

      {/* Step 3 — Payment */}
      {step === 3 && (
        <PaymentForm
          onSubmit={handlePlaceOrder}
          onBack={() => setStep(2)}
          loading={placing}
        />
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SiteLayout>
        <CheckoutContent />
      </SiteLayout>
    </Suspense>
  );
}
