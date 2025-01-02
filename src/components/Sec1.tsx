"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Structure = {
  id: number,
  title: string,
  image: string,
  price: number,
  category: string,
  description: string,
  stock: number,
  rating: number,
};

const Sec1 = () => {
  const [data, setData] = useState<Structure[]>([]);
  console.log(data);
  
  useEffect(() => {
    async function getData() {
      const response = await fetch('https://fakestoreapi.com/products?limit=8');
      const result = await response.json();
      setData(result); 
    }
    getData();
  }, []); 

  return (
    <div className='flex flex-col w-full  lg:h-[150vh] mb-9 md:mb-0 min-h-screen md:h-screen'>
      <div className='my-5 mx-4 md:mx-10 lg:mx-8'>
        <h1 className='text-xl md:text-4xl font-bold'>Discover our latest innovations!</h1>
      </div>
      <div className='relative grid grid-cols-1 w-[90%] mx-auto md:grid-cols-4 gap-6'>
        {data.map((product) => (
          <div 
            key={product.id} 
            className='p-7 bg-white content-center border-2 rounded-lg bg-center flex justify-between flex-col transition-all hover:scale-105 duration-200 shadow-lg'>
              <div className='relative flex justify-between flex-col items-center'>
            <Image
              src={product.image}
              alt={product.title}
              height={200}
              width={200}
              className='md:size-[200px] h-[200px] w-[180px]  bg-center  mb-3 items-center flex justify-center '
            />
            </div>
            <h2 className='text-base md:text-sm lg:text-lg font-sans font-bold'>{product.title.trim().slice(0,36)}</h2>
            <div className='flex flex-row lg:flex-row md:flex-col mt-2 md:gap-2 lg:gap-5  items-center justify-between'>
            <p>Price: ${product.price}</p>
            <Link 
            href={`/post/${product.id}`}
            >
            <button className='py-1 px-5 rounded-full text-white font-bold bg-black'>Cart</button>
            </Link>
            </div>
           </div> 
      
        ))}
      </div>
    </div>
  );
}

export default Sec1;
