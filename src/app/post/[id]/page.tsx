"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Extras } from '@/components/data';

type Post = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  rating: number;
  quantity: number;
};

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Post[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setProduct({ ...data, quantity: 1 });
        } catch (error) {
          if (error instanceof Error) {
            setError('Failed to fetch product data. ' + error.message);
          } else {
            setError('Failed to fetch product data.');
          }
        }
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Post) => {
    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    setIsCartVisible(true);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div className='flex h-[50vh] justify-center items-center text-5xl'>Loading...</div>;

  return (
    <div>
      <div className='w-full h-screen lg:h-screen flex justify-center items-center'>
        <div className='flex flex-col md:flex-col lg:flex-row w-[90%] justify-center items-center'>
          <div className='w-[40%]'>
            <Image
              src={product.image}
              alt={product.title}
              height={2000}
              width={2000}
              className='lg:w-[60%] w-full mb-5 rounded-lg'
            />
          </div>
          <div className='lg:w-[40%] w-full'>
            <h1 className='lg:text-4xl text-2xl font-sans font-bold'>{product.title}</h1>
            <p className='my-4 font-sans text-xl lg:text-2xl'>{product.description}</p>
            <div className='flex justify-between items-center'>
              <p className='text-lg'>Price: ${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>

      {isCartVisible && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end'>
          <div className='bg-white lg:w-[30%] md:w-[40%] w-[60%] h-full p-5 rounded-l-lg shadow-lg'>
            <div className='flex justify-between items-center mb-5'>
              <h2 className='text-3xl font-bold'>Cart</h2>
              <Button onClick={() => setIsCartVisible(false)}>Close</Button>
            </div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className='mb-4 flex lg:flex-row flex-col justify-between items-center'>
                  <div className='flex flex-col justify-center items-center'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      height={50}
                      width={50}
                    />
                    <span className='ml-4'>Quantity: {item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                  <div className='flex gap-x-1 items-center'>
                    <Button className='lg:py-1 py-[3px] lg:px-3 px-2' onClick={() => increaseQuantity(item.id)}>+</Button>
                    <Button className='lg:py-1 py-[3px] lg:px-3 px-2' onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className='w-full h-full'>
        <Extras />
      </div>
    </div>
  );
};

export default ProductPage;
