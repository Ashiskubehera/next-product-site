'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/src/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const subtotal = item.price * item.qty;

  return (
    <div className='flex items-center justify-between border-b border-gray-200 py-4'>
      <div className='flex-1'>
        <h3 className='text-lg font-semibold'>{item.name}</h3>
        <p className='text-sm text-gray-600'>Unit Price: ${item.price.toFixed(2)}</p>
        <p className='text-sm text-gray-600'>Quantity: {item.qty}</p>
        <p className='text-base font-medium mt-2'>Subtotal: ${subtotal.toFixed(2)}</p>
      </div>
      <div className='flex items-center gap-2'>
        <button
          onClick={onDecrease}
          className='px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-semibold'
          aria-label='Decrease quantity'
        >
          -
        </button>
        <button
          onClick={onIncrease}
          className='px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-semibold'
          aria-label='Increase quantity'
        >
          +
        </button>
        <button
          onClick={onRemove}
          className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium'
          aria-label='Remove item'
        >
          Remove
        </button>
      </div>
    </div>
  );
}
