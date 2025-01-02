"use client";
import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Post = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  rating: number;
  quantity: number; // Adding quantity field
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cart, setCart] = useState<Post[]>([]);

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
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const sampleProduct: Post = {
    id: 1,
    title: "Sample Product",
    image: "path_to_image",
    price: 99.99,
    category: "Sample Category",
    description: "This is a sample product",
    stock: 10,
    rating: 4.5,
    quantity: 1,
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header onOpenCart={() => setIsCartVisible(true)} />
        {children}
        <Footer />
        {isCartVisible && (
          <Cart 
            cart={cart} 
            onClose={() => setIsCartVisible(false)} 
            onIncreaseQuantity={increaseQuantity} 
            onDecreaseQuantity={decreaseQuantity} 
            onRemoveFromCart={removeFromCart} 
          />
        )}
      </body>
    </html>
  );
}

interface CartProps {
  cart: Post[];
  onClose: () => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

function Cart({ cart, onClose, onIncreaseQuantity, onDecreaseQuantity, onRemoveFromCart }: CartProps) {
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end'>
      <div className='bg-white lg:w-[30%] md:w-[40%] w-[60%] h-full p-5 rounded-l-lg shadow-lg'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-3xl font-bold'>Cart</h2>
          <Button onClick={onClose}>Close</Button>
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
                <Button className='py-1 px-3' onClick={() => onIncreaseQuantity(item.id)}>+</Button>
                <Button className='py-1 px-3' onClick={() => onDecreaseQuantity(item.id)}>-</Button>
                <Button onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
