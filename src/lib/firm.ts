// Datos de contacto del estudio (ficticios). Cambiar acá y se actualiza toda la página.
export const FIRM = {
  name: "Morandi & Asociados",
  phoneDisplay: "+54 9 381 555-0142",
  phoneHref: "tel:+5493815550142",
  whatsappNumber: "5493815550142",
  email: "contacto@morandiasociados.com.ar",
  addressLine1: "Av. 24 de Septiembre 742, Piso 3 · Of. B",
  addressLine2: "T4000 San Miguel de Tucumán, Tucumán",
  mapsQuery: "Plaza Independencia, San Miguel de Tucumán",
  linkedin: "https://www.linkedin.com",
  instagram: "https://www.instagram.com",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${FIRM.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(FIRM.mapsQuery)}&z=16&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FIRM.mapsQuery)}`;
