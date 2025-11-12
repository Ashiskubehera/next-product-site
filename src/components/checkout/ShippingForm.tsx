'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';

interface ShippingFormData {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ShippingForm() {
  const router = useRouter();
  const { setShipping } = useCart();

  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.address1.trim()) {
      newErrors.address1 = 'Address line 1 is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Optional but validated fields
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setShipping(formData);
      router.push('/checkout/payment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-1'>
          Full Name <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='fullName'
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.fullName && <p className='mt-1 text-sm text-red-500'>{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor='address1' className='block text-sm font-medium text-gray-700 mb-1'>
          Address Line 1 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='address1'
          name='address1'
          value={formData.address1}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.address1 ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.address1 && <p className='mt-1 text-sm text-red-500'>{errors.address1}</p>}
      </div>

      <div>
        <label htmlFor='address2' className='block text-sm font-medium text-gray-700 mb-1'>
          Address Line 2
        </label>
        <input
          type='text'
          id='address2'
          name='address2'
          value={formData.address2}
          onChange={handleChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='city' className='block text-sm font-medium text-gray-700 mb-1'>
            City <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='city'
            name='city'
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && <p className='mt-1 text-sm text-red-500'>{errors.city}</p>}
        </div>

        <div>
          <label htmlFor='state' className='block text-sm font-medium text-gray-700 mb-1'>
            State/Province
          </label>
          <input
            type='text'
            id='state'
            name='state'
            value={formData.state}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='postalCode' className='block text-sm font-medium text-gray-700 mb-1'>
            Postal Code <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='postalCode'
            name='postalCode'
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.postalCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.postalCode && <p className='mt-1 text-sm text-red-500'>{errors.postalCode}</p>}
        </div>

        <div>
          <label htmlFor='country' className='block text-sm font-medium text-gray-700 mb-1'>
            Country <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='country'
            name='country'
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.country && <p className='mt-1 text-sm text-red-500'>{errors.country}</p>}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
            Phone
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className='mt-1 text-sm text-red-500'>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
        </div>
      </div>

      <div className='pt-4'>
        <button
          type='submit'
          className='w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors'
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
