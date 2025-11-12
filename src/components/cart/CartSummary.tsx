'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/src/context/CartContext';

interface CartSummaryProps {
  hideButton?: boolean;
}

export default function CartSummary({ hideButton = false }: CartSummaryProps) {
  const { state } = useCart();

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1; // 10% tax (adjust as needed)
  const total = subtotal + tax;

  return (
    <div className='border-t border-gray-200 pt-6 mt-6'>
      <div className='space-y-2 mb-4'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Subtotal:</span>
          <span className='font-medium'>${subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Tax:</span>
          <span className='font-medium'>${tax.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-lg font-semibold pt-2 border-t border-gray-200'>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {!hideButton && (
        <Link
          href='/checkout/review'
          className='block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors'
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
