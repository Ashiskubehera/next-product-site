'use client';

import React from 'react';
import { CartProvider } from '@/src/context/CartContext';
import CheckoutStepper from '@/src/components/checkout/CheckoutStepper';

export default function PaymentPage() {
  return (
    <CartProvider>
      <main className='flex min-h-screen flex-col p-24'>
        <div className='max-w-4xl w-full mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>Checkout</h1>
          <CheckoutStepper currentStep='payment' />
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-semibold mb-6'>Payment Information</h2>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
              <p className='text-gray-500'>PaymentForm component area</p>
              <p className='text-sm text-gray-400 mt-2'>To be implemented</p>
            </div>
          </div>
        </div>
      </main>
    </CartProvider>
  );
}
