// HINODE EPOXY Brand Constants

export const BRAND = {
  name: "HINODE EPOXY",
  tagline: "Solusi Lantai Epoxy Profesional",
  description: "Penyedia jasa aplikator lantai epoxy profesional untuk wilayah Jabodetabek, Jawa Barat, dan Banten. Kualitas terjamin dengan harga kompetitif.",
  phone: "+6281287370601",
  whatsapp: "6281287370601",
  whatsappLink: "https://wa.me/6281287370601",
  email: "info@hinodeepoxy.com",
  address: "Kalideres, Jakarta Barat, DKI Jakarta",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.4!2d106.69!3d-6.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f9!2sKalideres!5e0!3m2!1sen!2sid!4v1",
  serviceAreas: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi", "Bandung", "Banten"],
  social: {
    instagram: "https://instagram.com/hinodeepoxy",
    facebook: "https://facebook.com/hinodeepoxy",
    tiktok: "https://tiktok.com/@hinodeepoxy",
  },
} as const;

export const SERVICES = {
  coating: {
    id: "coating",
    name: "Epoxy Coating",
    shortDesc: "Lapisan pelindung lantai dengan ketebalan 0.3-0.5mm",
    pricePerM2: 150000,
    minArea: 50,
    features: [
      "Ketebalan 0.3 - 0.5 mm",
      "Anti debu & mudah dibersihkan",
      "Tahan bahan kimia ringan",
      "Cocok untuk gudang & pabrik ringan",
      "Garansi 2 tahun",
    ],
    ideal: "Gudang, parkiran, workshop ringan",
  },
  selfLeveling: {
    id: "self-leveling",
    name: "Self-Leveling",
    shortDesc: "Lantai epoxy rata sempurna dengan ketebalan 1-3mm",
    pricePerM2: 350000,
    minArea: 30,
    features: [
      "Ketebalan 1 - 3 mm",
      "Permukaan rata sempurna (glossy/matte)",
      "Anti slip & anti bakteri",
      "Tahan bahan kimia sedang",
      "Cocok untuk area steril & showroom",
      "Garansi 3 tahun",
    ],
    ideal: "Rumah sakit, laboratorium, showroom, cafe",
  },
  heavyDuty: {
    id: "heavy-duty",
    name: "Heavy Duty",
    shortDesc: "Lantai epoxy extra tebal untuk beban berat 3-5mm",
    pricePerM2: 550000,
    minArea: 100,
    features: [
      "Ketebalan 3 - 5 mm",
      "Tahan beban forklift & kendaraan berat",
      "Anti benturan & anti geser",
      "Tahan bahan kimia kuat",
      "Cocok untuk industri berat",
      "Garansi 5 tahun",
    ],
    ideal: "Pabrik, cold storage, area loading dock",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
] as const;

export const WHATSAPP_MESSAGE = "Halo HINODE EPOXY, saya tertarik dengan jasa epoxy lantai. Bisa info lebih lanjut?";

export const getWhatsAppLink = (message?: string) => {
  const msg = encodeURIComponent(message || WHATSAPP_MESSAGE);
  return `https://wa.me/${BRAND.whatsapp}?text=${msg}`;
};
