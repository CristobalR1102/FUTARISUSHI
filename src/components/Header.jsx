import { menu } from "../data/menu"

export default function Header({ activeCategory, setActiveCategory, cartCount }) {
  return (
    <header className="bg-neutral-900 text-white sticky top-0 z-50">
      <div className="px-5 pt-5 pb-3 flex justify-between items-center">
        <div>
          <div className="font-black text-3xl tracking-widest">BAZZI</div>
          <div className="text-xs tracking-widest text-neutral-400 mt-0.5">ARABIAN FOOD</div>
        </div>
        <div className="text-sm font-medium border border-neutral-600 rounded-full px-4 py-2">
          Carrito ({cartCount})
        </div>
      </div>

      <nav className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
        {menu.map((section) => (
          <button
            key={section.category}
            onClick={() => setActiveCategory(section.category)}
            className={`whitespace-nowrap text-xs tracking-wide px-4 py-1.5 rounded-full border transition-all ${
              activeCategory === section.category
                ? "bg-white text-neutral-900 border-white font-medium"
                : "border-neutral-600 text-neutral-400 hover:border-neutral-400"
            }`}
          >
            {section.category}
          </button>
        ))}
      </nav>
    </header>
  )
}