
"use client"

import { useFormContext } from "react-hook-form";
import { Size } from "@/domain/sizes";

export default function SelectSize({sizes, name}: {sizes: Size[], name: string}) {
  const {register} = useFormContext();

  return (
    <select
      {...register(name)}
      className="input-form cursor-pointer appearance-none pr-8 bg-no-repeat bg-right"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 8px center",
      }}
    >

      {sizes.map((size) => (
        <option key={size.id} value={size.id}>
          {size.name}
        </option>
      ))}
    </select>
  )
}
