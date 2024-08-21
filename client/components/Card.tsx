import React from "react";
import Quickview from "./Quickview";

const Card = ({ product }: any) => {
  return (
    <div>
      <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            alt="product"
            src={product.productUrlImgs[0]}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product?.productName}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product?.productColors.map((color: any) => color.name + "  ")}
            </p>
          </div>
          <p className="text-sm font-medium text-green-500">
            ${product.productPrice}
          </p>
        </div>
      </div>
      <Quickview id={product.id} />
    </div>
  );
};

export default Card;
