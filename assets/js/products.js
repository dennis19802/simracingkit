/*
 * SimRacingKit Shop – Produktkonfiguration
 * ------------------------------------------------------------
 * NUR DIESE DATEI musst du pflegen.
 *
 * status:      "available" = kaufbar, "soon" = angekündigt (kein Kauf-Button)
 * checkoutUrl: Checkout-Link aus Lemon Squeezy
 *              (Store → Products → Produkt → "Share" → Checkout URL)
 *              Erlaubt sind nur https-Links auf *.lemonsqueezy.com –
 *              alles andere wird vom Shop-Script ignoriert (Schutz vor
 *              manipulierten Links).
 * price:       Anzeigepreis in EUR inkl. MwSt. – muss mit dem Preis in
 *              Lemon Squeezy übereinstimmen (dort "Tax inclusive" aktivieren).
 *              ALLE PREISE UNTEN SIND PLATZHALTER!
 * requires:    IDs der Produkte, deren Lizenz Voraussetzung ist.
 */
window.SRK_SHOP = Object.freeze({
  currency: "EUR",
  locale: "de-DE",
  pricesIncludeVat: true,
  allowedCheckoutHosts: ["lemonsqueezy.com"],

  products: [
    {
      id: "core",
      type: "core",
      name: "Vehicle System",
      tagline: "The required core: full vehicle physics with source code.",
      price: 89,
      status: "soon",
      checkoutUrl: "",
      requires: [],
      features: [
        "Full C# source code",
        "Pacejka tires with temperature, pressure & wear",
        "Engine, clutch, gearbox & differentials",
        "Suspension, brakes, aero & driving assists",
        "Car Builder wizard & setup assistants",
        "Steering wheel input & force feedback",
        "No vehicle or wheel limits"
      ]
    },
    {
      id: "weather",
      type: "addon",
      name: "Weather & Day/Night",
      tagline: "Dynamic weather that changes how the car drives.",
      price: 39,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "Day/night cycle, clouds, rain & lightning",
        "Water film with drying & aquaplaning",
        "Drying racing line per track position",
        "Wet asphalt shader & camera rain"
      ]
    },
    {
      id: "realroad",
      type: "addon",
      name: "Real Road",
      tagline: "Surface detection and road materials.",
      price: 29,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "Asphalt, curb, grass & gravel surfaces",
        "Surface-dependent grip",
        "URP asphalt shader"
      ]
    },
    {
      id: "tracktools",
      type: "addon",
      name: "Track Tools & Racing Line",
      tagline: "Build tracks and generate an optimal racing line.",
      price: 29,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "TrackBuilder: scan, measure, track data",
        "Optimised racing line & speed profile",
        "GPU-instanced racing line arrows",
        "Vehicle-dependent braking points"
      ]
    },
    {
      id: "racing",
      type: "addon",
      name: "Racing System",
      tagline: "Sessions, timing, race UI, replays and ghosts.",
      price: 49,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "Practice, qualifying & race sessions",
        "Lap timing & race UI",
        "Replay with track cameras",
        "Ghost driver"
      ]
    },
    {
      id: "ai",
      type: "addon",
      name: "AI Drivers",
      tagline: "Realistic AI opponents on the same physics.",
      price: 49,
      status: "soon",
      checkoutUrl: "",
      requires: ["core", "tracktools"],
      features: [
        "AI uses the same vehicle physics",
        "Realistic driving style with line variation",
        "Same prefab for AI and player"
      ]
    },
    {
      id: "complete",
      type: "bundle",
      name: "Complete Bundle",
      tagline: "Everything – core plus all add-ons, current and future.",
      price: 199,
      compareAt: 284,
      status: "soon",
      checkoutUrl: "",
      requires: [],
      featured: true,
      features: [
        "Vehicle System (core)",
        "All add-ons listed on this page",
        "Future add-ons included",
        "Best value"
      ]
    }
  ]
});
