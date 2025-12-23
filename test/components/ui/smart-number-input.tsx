"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SmartNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function SmartNumberInput({ value, onChange, className, disabled, ...props }: SmartNumberInputProps) {
  const [displayValue, setDisplayValue] = React.useState(value.toString())
  const [isFocused, setIsFocused] = React.useState(false)

  // Sync display value when external value changes (and not focused)
  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(value.toString())
    }
  }, [value, isFocused])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (disabled) return
    setIsFocused(true)
    e.target.select()
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Parse and set final value
    const parsed = Number.parseFloat(displayValue) || 0
    setDisplayValue(parsed.toString())
    onChange(parsed)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    const newValue = e.target.value

    // Allow empty string during typing
    if (newValue === "") {
      setDisplayValue("")
      return
    }

    // Allow valid number patterns including decimals
    if (/^-?\d*\.?\d*$/.test(newValue)) {
      setDisplayValue(newValue)
      const parsed = Number.parseFloat(newValue)
      if (!isNaN(parsed)) {
        onChange(parsed)
      }
    }
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      className={cn("text-center", className)}
      value={displayValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}
