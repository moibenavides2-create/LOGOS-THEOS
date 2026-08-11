// Convierte el texto escrito por el pastor (con **negrita**, listas con "- "
// y párrafos separados por línea en blanco) en HTML seguro para mostrar.

export function escaparHtml(str){
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function procesarLinea(linea){
  return escaparHtml(linea)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

// Si una línea es un link de YouTube, Google Drive, o un archivo de imagen/audio,
// devuelve el HTML incrustado. Si no reconoce el link, devuelve null.
function detectarMedia(url){
  const limpio = escaparHtml(url);

  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if(yt){
    return `<div class="incrustado-video"><iframe src="https://www.youtube.com/embed/${yt[1]}" allowfullscreen loading="lazy"></iframe></div>`;
  }

  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if(drive){
    return `<div class="incrustado-video"><iframe src="https://drive.google.com/file/d/${drive[1]}/preview" allowfullscreen loading="lazy"></iframe></div>`;
  }

  if(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url)){
    return `<img class="incrustado-imagen" src="${limpio}" alt="" loading="lazy">`;
  }

  if(/\.(mp3|wav|ogg|m4a)(\?.*)?$/i.test(url)){
    return `<audio class="incrustado-audio" controls src="${limpio}"></audio>`;
  }

  return null;
}

export function formatearTexto(texto){
  const bloques = (texto || "").trim().split(/\n\s*\n/);
  return bloques
    .filter(b => b.trim().length > 0)
    .map(bloque => {
      const lineas = bloque.split("\n").map(l => l.trim()).filter(l => l.length > 0);

      // Un bloque que es un solo link se muestra incrustado (imagen, video o audio)
      if(lineas.length === 1 && /^https?:\/\/\S+$/.test(lineas[0])){
        const incrustado = detectarMedia(lineas[0]);
        if(incrustado) return incrustado;
      }

      const esLista = lineas.length > 0 && lineas.every(l => /^[-*]\s+/.test(l));

      if(esLista){
        const items = lineas.map(l => `<li>${procesarLinea(l.replace(/^[-*]\s+/, ""))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${lineas.map(procesarLinea).join("<br>")}</p>`;
    })
    .join("");
}
