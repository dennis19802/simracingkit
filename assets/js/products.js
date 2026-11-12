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
 *              Bundle: Streichpreis = Summe aller Einzelpreise (automatisch).
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
      price: 60,
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
      price: 30,
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
      price: 30,
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
      id: "racing",
      type: "addon",
      name: "Racing System",
      tagline: "Track tools, racing line, sessions, timing, replays and ghosts.",
      price: 60,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "TrackBuilder: scan, measure, track data",
        "Optimised racing line & speed profile",
        "GPU-instanced racing line arrows",
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
      price: 49, // PLATZHALTER – Preis noch festlegen
      status: "soon",
      checkoutUrl: "",
      requires: ["core", "racing"],
      features: [
        "AI uses the same vehicle physics",
        "Realistic driving style with line variation",
        "Same prefab for AI and player"
      ]
    },
    {
      id: "menu",
      type: "addon",
      name: "Menu System",
      tagline: "Ready-made game menus for your racing game.",
      price: 60,
      status: "soon",
      checkoutUrl: "",
      requires: ["core"],
      features: [
        "Main menu, car & track selection",
        "Settings for graphics, audio & controls",
        "Steering wheel & gamepad setup"
      ]
    },
    {
      id: "complete",
      type: "bundle",
      name: "Complete Bundle",
      tagline: "Everything – core plus all add-ons, current and future.",
      price: 200,  // mit Menu System: 250
      compareAt: 0, // Summe der Einzelpreise, wird automatisch berechnet
      status: "soon",
      checkoutUrl: "",
      requires: [],
      featured: true,
      features: [
        "Vehicle System (core)",
        "All add-ons listed on this page",
        "Best value"
      ]
    }
  ]
});
