"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Structure } from "./Sec1";

export const Extras = () => {
  const [data, setData] = useState<Structure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const cachedData = localStorage.getItem('products');
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const response = await fetch('https://fakestoreapi.com/products?limit=8');
          if (!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          localStorage.setItem('products', JSON.stringify(result));
          setData(result);
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      }
    }
    getData();
  }, []);

  return (
    <div className='w-full min-h-screen mb-10 lg:h-[135vh]'>
      <div className='grid grid-cols-1 w-[90%] mx-auto md:grid-cols-4 gap-6'>
        {error ? (
          <div>{error}</div>
        ) : (
          data.map((product) => (
            <div 
              key={product.id} 
              className='p-7 bg-white content-center border-2 rounded-lg bg-center flex justify-between flex-col items-center transition-all hover:scale-105 duration-200 shadow-lg'>
              <Image
                src={product.image}
                alt={product.title}
                height={200}
                width={200}
                className='size-[200px] bg-center mb-3 items-center flex justify-center'
              />
              <h2 className='text-lg font-sans font-bold'>{product.title.trim().slice(0,36)}</h2>
              <div className='flex gap-5 items-center justify-between'>
                <p>Price: ${product.price}</p>
                <Link href={`/post/${product.id}`}>
                  <button className='py-1 px-5 rounded-full text-white font-bold bg-black'>Cart</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
