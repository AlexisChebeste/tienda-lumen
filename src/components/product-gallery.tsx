import { ProductImage } from "@/domain/product-image";
import Image from "next/image";

export interface ProductGalleryProps {
    images: ProductImage[];
    selectImage: number;
    setSelectImage: (index: number) => void;
}

export default function ProductGallery({images, selectImage, setSelectImage}: ProductGalleryProps) {
    
    const hasMultipleImages = images.length > 1;

    return(
        <div className={hasMultipleImages ? "grid md:grid-cols-4 gap-3" : "w-full"}>
            
            {/* Imagen principal */}
            <div className={`
                relative aspect-square w-full
                ${hasMultipleImages ? "order-1 md:order-2 md:col-span-3" : ""}
            `}>
                <Image 
                    src={images[selectImage].url} 
                    alt="Product Image"  
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    loading="eager"
                />
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
                <div className="order-2 md:order-1 grid grid-cols-3 md:grid-cols-1 gap-3">
                    {images.map((img, index) => (
                        <button 
                            key={index} 
                            onClick={()=> setSelectImage(index)} 
                            className={`border-2 ${selectImage === index ? 'border-black' : 'border-gray-300'} rounded-md overflow-hidden`}
                        >
                            <Image 
                                src={img.url} 
                                alt={`Product Image ${index + 1}`} 
                                width={250} 
                                height={250} 
                                className="object-cover h-full brightness-75 hover:brightness-100 transition duration-200 hover:scale-105"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}