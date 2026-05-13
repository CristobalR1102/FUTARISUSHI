export default function Especial({ onBack }) {
  const servicios = [
    {
      titulo: "Cenas Árabes",
      desc: "Si tienes una fecha importante que celebrar, podemos preparar cenas árabes especiales para que disfrutes junto a tus invitados una grata velada sin preocuparte de cocinar.",
      detalle: "Cenas árabes desde 6 a 20 personas."
    },
    {
      titulo: "Cenas y Servicio Catering",
      desc: "Nos encargamos de la planificación de platos, decoración de mesa, servicio de atención para los comensales y la coordinación junto al chef para un resultado totalmente personalizado.",
      detalle: "Agendas desde 15 personas."
    },
    {
      titulo: "Show de Danzas Árabes",
      desc: "Bazzi ofrece un místico y animado show para eventos especiales como cumpleaños, matrimonios, fiestas de empresa y más. Ideal para sorprender a sus invitados con la magia del medio oriente.",
      detalle: null
    },
    {
      titulo: "Productos Congelados",
      desc: "Venta al por mayor de kibbes, hojas de parra y masa para preparación de falafels.",
      detalle: null
    }
  ]

  return (
    <div className="min-h-screen max-w-md mx-auto pb-10" style={{ background: "#0a0a0a" }}>

      <div className="px-5 pt-6 pb-4 flex items-center gap-4 border-b" style={{ borderColor: "#2a2a2a" }}>
        <button
          onClick={onBack}
          className="text-sm border rounded-full px-4 py-1.5 transition-colors hover:bg-neutral-800"
          style={{ borderColor: "#404040", color: "#a3a3a3" }}
        >
          Volver
        </button>
        <span className="font-black text-xl tracking-widest" style={{ color: "var(--gold)" }}>Especial</span>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-4">

        {servicios.map((s) => (
          <div key={s.titulo} className="border rounded-xl p-5 flex flex-col gap-2" style={{ background: "#111111", borderColor: "#2a2a2a" }}>
            <span className="font-black text-base tracking-wide" style={{ color: "var(--gold)" }}>{s.titulo}</span>
            <p className="text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
            {s.detalle && (
              <p className="text-xs font-medium text-neutral-500 mt-1">{s.detalle}</p>
            )}
          </div>
        ))}

        <a
          href="mailto:arabianbazzi@gmail.com"
          className="w-full text-center rounded-xl py-4 text-sm font-semibold tracking-widest uppercase mt-2 transition-opacity hover:opacity-85"
          style={{ background: "var(--gold)", color: "#0a0a0a" }}
        >
          Solicita tu cotización
        </a>

        <p className="text-center text-xs text-neutral-600 -mt-2">arabianbazzi@gmail.com</p>

      </div>
    </div>
  )
}