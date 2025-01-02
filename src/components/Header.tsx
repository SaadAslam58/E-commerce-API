import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

type HeaderProps = { onOpenCart: () => void; };

const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  return (
    <div className="flex justify-center items-center flex-row w-full  h-[11vh] md:h-[11vh] lg:h-[15vh] my-2">
      <div className="flex  items-center justify-between  w-[90%] h-full shadow-xl rounded-full border ">
        <div className="flex text-xl font-sans font-bold justify-between w-full items-center px-5 ">
          <Link
          href="/"
          >
          <div>
            <h1>Cartosa</h1>
          </div>
          </Link>
          <div>
             <FaShoppingCart onClick={onOpenCart}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
