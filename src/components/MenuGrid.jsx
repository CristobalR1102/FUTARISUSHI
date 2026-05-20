import ItemCard from "./ItemCard"

export default function MenuGrid({ activeCategory, cart, onAdd, onRemove, menu }) {
  const section = menu.find((s) => s.category === activeCategory)
  if (!section) return null

  return (
    <main className="px-3 sm:px-4 py-5 pb-64">
      <div className="mb-4">
        <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--muted)" }}>Menú Bazzi</p>
        <h2 className="font-black text-3xl tracking-[0.04em] uppercase leading-tight text-white">
          {section.category}
        </h2>
      </div>
      <div className="flex flex-col gap-3.5">
        {section.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            qty={cart[item.id]?.qty || 0}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </main>
  )
}
