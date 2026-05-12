export default function ItemCard({ item, qty, onAdd, onRemove }) {
  const fmt = (n) => "$" + n.toLocaleString("es-CL")

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 flex justify-between items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-neutral-900">{item.name}</span>
          {item.tags.includes("popular") && (
            <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">Popular</span>
          )}
          {item.tags.includes("veg") && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Vegano</span>
          )}
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed truncate">{item.desc}</p>
        <p className="text-sm font-medium text-neutral-900 mt-2">{fmt(item.price)}</p>
      </div>

      <div className="flex-shrink-0">
        {qty === 0 ? (
          <button
            onClick={() => onAdd(item)}
            className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-light hover:bg-neutral-700 transition-colors"
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRemove(item)}
              className="w-8 h-8 rounded-full border border-neutral-300 text-neutral-700 flex items-center justify-center text-lg hover:bg-neutral-100 transition-colors"
            >
              -
            </button>
            <span className="text-sm font-medium w-4 text-center">{qty}</span>
            <button
              onClick={() => onAdd(item)}
              className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-light hover:bg-neutral-700 transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}