import { ProductVariant } from "@/domain/catalog.types";
import { Color } from "@/domain/colors";
import { supabase } from "@/lib/supabase/client";

export function uniqueColorsFromVariants(variantProduct: ProductVariant[]) {
    const uniqueColors = new Set<Color>();
    variantProduct.reduce((acc, variant) => {
        if (!acc.has(variant.color.id)) {
            acc.add(variant.color.id);
            uniqueColors.add(variant.color);
        }
        return acc;
    }, new Set<string>());
    return Array.from(uniqueColors);
}

export async function getProductImages(productId: string) {
    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching product images:", error);
        return [];
    }
    return data;
}

export async function getProductImagesAll() {
    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .order("created_at", { ascending: false });
        
    if (error) {
        console.error("Error fetching product images:", error);
        return [];
    }
    return data;
}