'use client';

import React from 'react';
import { CartProvider } from '@/src/context/CartContext';
import CartList from '@/src/components/cart/CartList';
import CartSummary from '@/src/components/cart/CartSummary';

export default function CartPage() {
  return (
    <CartProvider>
      <main className='flex min-h-screen flex-col p-24'>
        <div className='max-w-4xl w-full mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <CartList />
            <CartSummary />
          </div>
        </div>
      </main>
    </CartProvider>
  );
}
