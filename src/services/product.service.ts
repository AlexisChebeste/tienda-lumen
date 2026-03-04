import { ProductVariant } from "@/domain/catalog.types";
import { Color } from "@/domain/colors";

export function uniqueColorsFromVariants(variantProduct: ProductVariant[]) {
    const uniqueColors = new Set<Color>();
    variantProduct.forEach((variant) => {
        uniqueColors.add(variant.color);
    });
    return Array.from(uniqueColors);
}