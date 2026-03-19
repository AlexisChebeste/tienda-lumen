"use client"

import { useFormContext } from "react-hook-form";
import { Color } from "@/domain/colors";

export default function SelectColor({colors, name, isVariant = false}: {colors: Color[], name: string, isVariant?: boolean}) {

  const {register, watch} = useFormContext();

  const valueColor = watch(name)

  return (
    <select
      {...register(name)}
      value={valueColor || ""}
      className="input-form cursor-pointer appearance-none pr-8 bg-no-repeat bg-right"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 8px center",
      }}
    >
      {!isVariant && <option value="">Selecciona un color</option>}

      {colors.map((color) => (
        <option key={color.id} value={color.id}>
          {color.name}
        </option>
      ))}
    </select>
  )
}
