"use client"

import { useEffect, useState } from "react"
import { getCategories } from "@/services/filter.service"
import { Category } from "@/domain/categories"
import { useFormContext } from "react-hook-form";

export default function CategoryNew() {

  const {register} = useFormContext();

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <select
      {...register("category_id")}
      className="input-form cursor-pointer appearance-none pr-8 bg-no-repeat bg-right"
      style={{
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 8px center",
      }}
    >
      <option value="">Seleccionar categoría</option>

      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}