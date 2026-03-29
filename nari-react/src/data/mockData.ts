export const siteContent = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#visit" },
  ],
  hero: {
    tagline: "Where beauty feels like home",
    services: "Hair  ·  Nails  ·  Spa",
    bgImage: "/images/salon-full.jpg",
  },
  intro: {
    heading: "A space made for you",
    text: "At Nary, we bring together expert hair styling, nail artistry, and head-to-toe pampering in one calm, modern space. Every visit is personal — because you deserve more than a quick appointment.",
    image: "/images/waiting-branded.jpg",
  },
  gallery: {
    images: [
      { src: "/images/salon-full.jpg", alt: "The Salon" },
      { src: "/images/nails-station.jpg", alt: "Nail Station" },
      { src: "/images/pedicure-hd.jpg", alt: "Pedicure Lounge" },
      { src: "/images/wall-detail.jpg", alt: "Interior Detail" },
      { src: "/images/exterior-sunset.jpg", alt: "Exterior" },
      { src: "/images/salon-render.jpg", alt: "The Space" },
    ],
  },
  footer: {
    hours: "Open Daily · 10 am — 9 pm",
    social: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "WhatsApp", href: "#" },
    ],
    nav: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
};

export const serviceMenu = [
  {
    id: 'hair',
    label: 'Hair',
    sections: [
      {
        name: 'Blowdry',
        items: [
          { name: 'Short', price: '105' },
          { name: 'Medium', price: '125' },
          { name: 'Long', price: '155' },
          { name: 'X-Long', price: '200' },
        ],
      },
      {
        name: 'Hairstyles',
        items: [
          { name: 'Short', price: '180' },
          { name: 'Medium', price: '200' },
          { name: 'Long', price: '250' },
          { name: 'X-Long', price: '280' },
        ],
      },
      {
        name: 'Hair Cuts',
        items: [
          { name: 'Trim Cut', price: '100' },
          { name: 'Haircut', price: '150' },
          { name: 'Fringe Cut', price: '50' },
          { name: 'Kids Cut', price: '80' },
        ],
      },
      {
        name: 'Roots Color',
        items: [
          { name: 'Short', price: '150' },
          { name: 'Medium', price: '200' },
          { name: 'Long', price: '250' },
        ],
      },
      {
        name: 'Full Color',
        items: [
          { name: 'Short', price: '260' },
          { name: 'Medium', price: '400' },
          { name: 'Long', price: '600' },
        ],
      },
      {
        name: 'Highlights',
        items: [
          { name: 'Short', price: '600' },
          { name: 'Medium', price: '690' },
          { name: 'Long', price: '700' },
        ],
      },
      {
        name: 'Toner',
        items: [
          { name: 'Short', price: '150' },
          { name: 'Medium', price: '200' },
          { name: 'Long', price: '250' },
        ],
      },
      {
        name: 'Protein Treatment',
        items: [
          { name: 'Bangs', price: '200' },
          { name: 'Roots', price: '450' },
          { name: 'Short', price: '600' },
          { name: 'Medium', price: '800' },
          { name: 'Long', price: '1000' },
          { name: 'X-Long', price: '1500' },
        ],
      },
      {
        name: 'Hair Treatment',
        items: [
          { name: 'Moreno — Short', price: '130' },
          { name: 'Moreno — Long', price: '219' },
          { name: 'Caviar — Short', price: '300' },
          { name: 'My Promise — Short', price: '300' },
        ],
      },
      {
        name: 'Wash',
        items: [
          { name: 'Wash & Dry', price: '65' },
          { name: 'Wash Only', price: '30' },
        ],
      },
    ],
  },
  {
    id: 'nails',
    label: 'Nails',
    sections: [
      {
        name: 'Classic / Regular',
        items: [
          { name: 'Manicure', price: '60' },
          { name: 'Pedicure', price: '75' },
          { name: 'Manicure w/ Polish', price: '80' },
          { name: 'Pedicure w/ Polish', price: '90' },
          { name: 'Polish (Hand/Feet)', price: '30' },
          { name: 'Cut & Filling', price: '25' },
          { name: 'Normal Polish', price: '10' },
        ],
      },
      {
        name: 'Fashion Nails',
        items: [
          { name: 'French Manicure', price: '115' },
          { name: 'French Pedicure', price: '125' },
          { name: 'French Tip Polish', price: '50' },
          { name: 'Gel Pedicure', price: '140' },
          { name: 'Cat Eye', price: '50' },
          { name: 'Cat Eye Pedicure', price: '20' },
        ],
      },
      {
        name: 'Fake Nails',
        items: [
          { name: 'w/ Normal Polish', price: '120' },
          { name: 'Acrylic Per Tip', price: '15' },
          { name: 'Soft Gel', price: '20' },
          { name: 'Polygel', price: '220' },
          { name: 'Polygel Per Tip', price: '20' },
          { name: 'Extension Removal', price: '100' },
        ],
      },
      {
        name: 'Add-Ons',
        items: [
          { name: 'Princess Mani/Pedi (3–7)', price: '75' },
          { name: 'Princess Mani/Pedi (8–14)', price: '90' },
          { name: 'Nail Art', price: '15' },
          { name: 'Kids Sticker', price: '10' },
          { name: 'Nail Remove', price: '30' },
          { name: 'Soak Off', price: '30' },
          { name: 'Fix Nail', price: '10' },
        ],
      },
    ],
  },
  {
    id: 'waxing',
    label: 'Waxing & Threading',
    sections: [
      {
        name: 'Waxing',
        items: [
          { name: 'Full Body', price: '280' },
          { name: 'Full Arms', price: '50' },
          { name: 'Full Bikini', price: '100' },
          { name: 'Full Face', price: '120' },
          { name: 'Half Arms', price: '30' },
          { name: 'Half Legs (Upper)', price: '60' },
          { name: 'Half Legs (Lower)', price: '50' },
          { name: 'Under Arm', price: '20' },
          { name: 'Bikini Line', price: '60' },
          { name: 'Stomach', price: '40' },
          { name: 'Nose', price: '25' },
        ],
      },
      {
        name: 'Threading',
        items: [
          { name: 'Eyebrow', price: '30' },
          { name: 'Full Face', price: '115' },
          { name: 'Upper Lip', price: '20' },
          { name: 'Chin', price: '25' },
          { name: 'Side Face', price: '20' },
          { name: 'Front Head', price: '10' },
        ],
      },
    ],
  },
  {
    id: 'lash',
    label: 'Lash & Beauty',
    sections: [
      {
        name: 'Eyelash Extensions',
        items: [
          { name: 'Classic', price: '225' },
          { name: '2D', price: '250' },
          { name: '3D', price: '300' },
          { name: 'Mega Volume', price: '1200' },
          { name: 'Removal', price: '60' },
          { name: 'Refill', price: '170' },
          { name: 'Mascara Effect', price: '180' },
        ],
      },
      {
        name: 'Makeup & Brows',
        items: [
          { name: 'Full Makeup', price: '250' },
          { name: 'Eyebrow Tinting', price: '70' },
          { name: 'Eyebrow Lamination', price: '120' },
        ],
      },
    ],
  },
];
