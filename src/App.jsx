import { useState } from "react"
import { menu } from "./data/menu"
import Header from "./components/Header"
import MenuGrid from "./components/MenuGrid"
import Cart from "./components/Cart"

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menu[0].category)
  const [cart, setCart] = useState({})

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0)

  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: { ...item, qty: (prev[item.id]?.qty || 0) + 1 }
    }))
  }

  const handleRemove = (item) => {
    setCart((prev) => {
      const qty = (prev[item.id]?.qty || 0) - 1
      if (qty <= 0) {
        const next = { ...prev }
        delete next[item.id]
        return next
      }
      return { ...prev, [item.id]: { ...prev[item.id], qty } }
    })
  }

  return (
    <div className="bg-neutral-100 min-h-screen max-w-md mx-auto">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
      />
      <MenuGrid
        activeCategory={activeCategory}
        cart={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
      <Cart cart={cart} />
    </div>
  )
}