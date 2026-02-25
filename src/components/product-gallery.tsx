import Image from "next/image";
import { useState } from "react";

export interface ProductGalleryProps {
    images: string[];
    selectImage: number;
    setSelectImage: (index: number) => void;
}

export default function ProductGallery({images, selectImage, setSelectImage}: ProductGalleryProps) {
    
    return(
        <div className="grid md:grid-cols-4 gap-3 ">
            <div className="order-1 md:order-2 md:col-span-3 aspect-square h-full">
                <Image 
                    src={images[selectImage]} 
                    alt="Product Image"  
                    width={800} 
                    height={800} 
                    className="object-cover"
                />
            </div>
            <div className="order-2 md:order-1 grid grid-cols-3 md:grid-cols-1 gap-3">
                {images.map((img, index) => (
                    <button key={index} onClick={()=> setSelectImage(index)} aria-label={`Select image ${index + 1}`} className={`border-2 ${selectImage === index ? 'border-black' : 'border-gray-300' } rounded-md overflow-hidden h-max cursor-pointer`}>
                        <Image 
                            src={img} 
                            alt={`Product Image ${index + 1}`} 
                            width={250} 
                            height={250} 
                            className="object-cover brightness-75 hover:brightness-100 transition duration-200"/>
                    </button>
                ))}
            </div>
        </div>
    )

}