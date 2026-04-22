"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  [key: string]: any
}

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc("/placeholder.svg")
      }}
    />
  )
}
