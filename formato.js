// Convierte el texto escrito por el pastor (con **negrita**, listas con "- "
// y párrafos separados por línea en blanco) en HTML seguro para mostrar.

export function escaparHtml(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function procesarLinea(linea){
  return escaparHtml(linea).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function formatearTexto(texto){
  const bloques = (texto || "").trim().split(/\n\s*\n/);
  return bloques
    .filter(b => b.trim().length > 0)
    .map(bloque => {
      const lineas = bloque.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      const esLista = lineas.length > 0 && lineas.every(l => /^[-*]\s+/.test(l));

      if(esLista){
        const items = lineas.map(l => `<li>${procesarLinea(l.replace(/^[-*]\s+/, ""))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${lineas.map(procesarLinea).join("<br>")}</p>`;
    })
    .join("");
}
