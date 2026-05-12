import { WHATSAPP_NUMBER } from "../data/menu"

export default function Cart({ cart }) {
  const items = Object.values(cart)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const fmt = (n) => "$" + n.toLocaleString("es-CL")

  const sendWhatsApp = () => {
    if (items.length === 0) return
    const lines = items.map((i) => `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join("\n")
    const msg = `*Pedido BAZZI*\n\n${lines}\n\n*Total: ${fmt(total)}*`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-neutral-200 z-50">
      <div className="px-5 py-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-neutral-500">
            {items.reduce((s, i) => s + i.qty, 0)} productos
          </span>
          <span className="font-black text-lg tracking-wide">{fmt(total)}</span>
        </div>

        <div className="flex flex-col gap-1 mb-4 max-h-36 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-neutral-600">{item.name} <span className="text-neutral-400">x{item.qty}</span></span>
              <span className="text-neutral-900 font-medium">{fmt(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={sendWhatsApp}
          className="w-full bg-neutral-900 text-white rounded-xl py-3.5 text-sm font-medium tracking-wide hover:bg-neutral-700 transition-colors"
        >
          Enviar pedido por WhatsApp
        </button>
      </div>
    </div>
  )
}