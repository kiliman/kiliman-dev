import { useState } from 'react'
export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button
      className="w-16 px-4 py-2 text-white bg-red-900 rounded-md"
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  )
}
