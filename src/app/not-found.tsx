import Link from 'next/link'
import React from 'react'

function notFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-lg ">404</p>
        <p className="font-extrabold text-3xl">Seems like you are lost</p>
        <Link href="/" className="text-blue-600 underline">Go back home</Link>
    </div>
  )
}

export default notFound