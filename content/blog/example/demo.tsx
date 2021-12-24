import { useState } from 'react'
export default function Demo() {
  const [count, setCount] = useState(0)
  return (
    <button
      className="w-16 px-4 py-2 rounded-md bg-slate-100 text-slate-900"
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  )
}
