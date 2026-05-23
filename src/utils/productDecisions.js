const slug = (text) => String(text || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")

const parseDecisiones = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

const normalizeOption = (option, index) => {
  const nombre = option.nombre || option.label || ""
  const precio = option.precio ?? option.precioExtra ?? option.price ?? 0
  const precioFinal = option.precioFinal ?? option.finalPrice ?? null

  return {
    id: option.id || slug(nombre) || `opcion-${index}`,
    nombre,
    cartLabel: option.cartLabel || option.nombreCarrito || nombre,
    precio: Number(precio) || 0,
    precioFinal: precioFinal === "" || precioFinal === null ? null : Number(precioFinal)
  }
}

const normalizeDecision = (decision, index) => {
  const tipo = decision.tipo === "single" ? "single" : "multiple"
  const opciones = Array.isArray(decision.opciones) ? decision.opciones.map(normalizeOption) : []

  return {
    id: decision.id || slug(decision.titulo) || `decision-${index}`,
    titulo: decision.titulo || "Elige una opcion",
    tipo,
    requerido: Boolean(decision.requerido),
    max: tipo === "single" ? 1 : Number(decision.max || 1),
    opciones
  }
}

const getLegacyDecisiones = (item) => {
  const nombre = item.nombre || item.name || ""
  const precio = Number(item.precio || item.price || 0)

  if (item.categoria === "Colaciones") {
    return [
      {
        id: "agregados",
        titulo: "Elige hasta 2 agregados",
        tipo: "multiple",
        max: 2,
        opciones: [
          { id: "arroz", nombre: "Arroz", precio: 0 },
          { id: "papas-fritas", nombre: "Papas fritas", precio: 0 },
          { id: "ensalada", nombre: "Ensalada", precio: 0 }
        ]
      },
      {
        id: "bebida-lata",
        titulo: "Bebida",
        tipo: "multiple",
        max: 1,
        opciones: [
          { id: "bebida-lata", nombre: "Agregar bebida lata", cartLabel: "Bebida lata", precio: 1200 }
        ]
      }
    ].map(normalizeDecision)
  }

  if (nombre.toLowerCase().includes("salchipapa")) {
    return [
      {
        id: "variante",
        titulo: "Elige una opcion",
        tipo: "single",
        requerido: true,
        opciones: [
          { id: "sola", nombre: "Salchipapa sola", precioFinal: precio },
          { id: "mini-fruna", nombre: "Con Mini Fruna", precioFinal: 4000 },
          { id: "bebida-lata", nombre: "Con bebida lata", precioFinal: 4800 }
        ]
      }
    ].map(normalizeDecision)
  }

  return []
}

export const getProductDecisions = (item) => {
  const configured = parseDecisiones(item.decisiones).map(normalizeDecision)
  return configured.length > 0 ? configured : getLegacyDecisiones(item)
}

export const cleanDecisiones = (decisiones) => {
  const clean = parseDecisiones(decisiones)
    .map((decision, index) => {
      const tipo = decision.tipo === "single" ? "single" : "multiple"
      const opciones = parseDecisiones(decision.opciones)
        .filter((option) => String(option.nombre || "").trim())
        .map((option, optionIndex) => {
          const cleanOption = {
            id: option.id || slug(option.nombre) || `opcion-${optionIndex}`,
            nombre: String(option.nombre || "").trim(),
            precio: Number(option.precio || 0)
          }

          if (option.precioFinal !== "" && option.precioFinal !== null && option.precioFinal !== undefined) {
            cleanOption.precioFinal = Number(option.precioFinal)
          }

          return cleanOption
        })

      return {
        id: decision.id || slug(decision.titulo) || `decision-${index}`,
        titulo: String(decision.titulo || "").trim(),
        tipo,
        requerido: Boolean(decision.requerido),
        max: tipo === "single" ? 1 : Number(decision.max || 1),
        opciones
      }
    })
    .filter((decision) => decision.titulo && decision.opciones.length > 0)

  return clean.length > 0 ? clean : null
}

export const hasConfiguredDecisions = (item) => parseDecisiones(item.decisiones).length > 0
