window.GROVEWELL = {
  types: ["Lodge", "House", "Cabin", "Estate"],
  collections: [
    { id: "light-footprint", title: "Light-footprint Homes", blurb: "Compact, passive-solar builds that sip energy and sit gently on the soil.", image: "homes/cedarline.jpg" },
    { id: "living-systems", title: "Living Systems Homes", blurb: "Rain catchment, geothermal loops, and kitchens that open onto kitchen gardens.", image: "homes/mossbank.jpg" },
    { id: "sanctuary", title: "Sanctuary Homes", blurb: "Quiet acres, deep porches, and rooms framed for weather and wildlife.", image: "homes/pineshadow.jpg" }
  ],
  properties: [
    {
      slug: "cedarline-lodge",
      name: "Cedarline Lodge",
      tagline: "A low-slung lodge on two quiet acres of second-growth fir.",
      collection: "light-footprint",
      location: "Snoqualmie, Washington",
      region: "Cascades",
      price: 1285000,
      beds: 4, baths: 3, sqft: 2840, acres: 2.4, type: "Lodge",
      image: "homes/cedarline.jpg",
      gallery: ["homes/cedarline.jpg", "homes/interior.jpg", "homes/hero.jpg"],
      blurb: "Butterfly roof, cedar rainscreen, and a lawn that runs into the treeline.",
      story: "Cedarline was raised on a former orchard bench above the Snoqualmie valley. Cross-laminated timber, a tightly sealed envelope, and a heat-pump hydronic floor keep the house warm with almost no visible machinery. The great room faces due south; summer shade comes from a deep eave and a line of existing maples we refused to move.",
      features: ["Passive House envelope", "Air-source heat pump", "FSC-certified cedar cladding", "Native meadow restoration", "Rain garden and cistern"]
    },
    {
      slug: "mossbank-house",
      name: "Mossbank House",
      tagline: "Craftsman timber and stone, set in a mossy island clearing.",
      collection: "living-systems",
      location: "Orcas Island, Washington",
      region: "San Juan Islands",
      price: 2150000,
      beds: 5, baths: 4, sqft: 3620, acres: 4.1, type: "House",
      image: "homes/mossbank.jpg",
      gallery: ["homes/mossbank.jpg", "homes/interior.jpg", "homes/forest.jpg"],
      blurb: "Wraparound porch, stone chimney, and a geothermal loop under the orchard.",
      story: "Mossbank sits on the cooler, forested side of Orcas. The original 1920s mill-worker cottage became the mudroom; everything else is new timber frame over a stone plinth. Greywater irrigates the kitchen terrace. On still evenings you can hear the ferry two coves away.",
      features: ["Closed-loop geothermal", "Reclaimed fir floors", "Island well with UV filtration", "Kitchen garden and orchard", "Ferry-accessible, car-light living"]
    },
    {
      slug: "fernwalk-cabin",
      name: "Fernwalk Cabin",
      tagline: "An A-frame for people who would rather watch weather than traffic.",
      collection: "light-footprint",
      location: "Hood River, Oregon",
      region: "Columbia Gorge",
      price: 890000,
      beds: 3, baths: 2, sqft: 1680, acres: 1.8, type: "Cabin",
      image: "homes/fernwalk.jpg",
      gallery: ["homes/fernwalk.jpg", "homes/interior.jpg", "homes/forest.jpg"],
      blurb: "Steep glass gable, espresso timber, and a stone path through sword ferns.",
      story: "Fernwalk is the smallest house in our book and often the most loved. The A-frame is a single heated volume with a sleeping loft and a ground-floor suite. Triple-pane glass looks into a hemlock stand that never needs mowing. A 7kW array on the south pitch covers the year.",
      features: ["Net-zero electric in a typical year", "Triple-pane gable glass", "Sleeping loft + ground suite", "Wood stove with catalytic insert", "Ten-minute walk to town trails"]
    },
    {
      slug: "tideglass-retreat",
      name: "Tideglass Retreat",
      tagline: "Glass, cedar, and a living roof above the Mendocino headlands.",
      collection: "living-systems",
      location: "Mendocino, California",
      region: "North Coast",
      price: 1740000,
      beds: 4, baths: 3, sqft: 2410, acres: 3.2, type: "House",
      image: "homes/tideglass.jpg",
      gallery: ["homes/tideglass.jpg", "homes/interior.jpg", "homes/hero.jpg"],
      blurb: "Floor-to-ceiling marine light, a sedum roof, and a weathered deck in the grass.",
      story: "Tideglass was commissioned for a botanist who wanted to live inside the weather. The west wall is a single glazed plane; the east wall is solid cedar against the wind. A sedum roof cools the house in September and holds the first rains of October. The nearest neighbor is a quarter mile of meadow.",
      features: ["Living sedum roof", "Marine-grade glazing", "On-demand solar + battery", "Fog-harvest irrigation", "Protected coastal meadow"]
    },
    {
      slug: "pineshadow-aerie",
      name: "Pineshadow Aerie",
      tagline: "A timber-and-stone lodge on eight private acres of old pine.",
      collection: "sanctuary",
      location: "Olympic Peninsula, Washington",
      region: "Olympics",
      price: 3200000,
      beds: 5, baths: 5, sqft: 4180, acres: 8.6, type: "Lodge",
      image: "homes/pineshadow.jpg",
      gallery: ["homes/pineshadow.jpg", "homes/interior.jpg", "homes/forest.jpg"],
      blurb: "Steep roof, heavy beams, and a chimney you can see from the lower meadow.",
      story: "Pineshadow is the house we send people to when they say they want quiet, not a view of other people's quiet. Eight acres of second-growth pine, a trout pond, and a lodge that uses a masonry heater as its winter heart. The guest wing can close off entirely. Cell service is a choice, not a default.",
      features: ["Masonry heater + backup heat pump", "Guest wing with separate entry", "Trout pond and meadow", "Dark-sky lighting covenant", "Conservation easement on 4 acres"]
    },
    {
      slug: "willowcroft",
      name: "Willowcroft",
      tagline: "A modern farmhouse facing willows and a slow river bend.",
      collection: "sanctuary",
      location: "Hudson Valley, New York",
      region: "Hudson Valley",
      price: 1450000,
      beds: 4, baths: 3, sqft: 2960, acres: 5, type: "Estate",
      image: "homes/willowcroft.jpg",
      gallery: ["homes/willowcroft.jpg", "homes/interior.jpg", "homes/hero.jpg"],
      blurb: "Whitewashed siding, black-framed glass, and a porch built for long evenings.",
      story: "Willowcroft replaced a failing dairy barn without erasing its footprint. The porch looks west over a willow line and a working hayfield we lease to a neighbor. Interior lime plaster, a pantry the size of a small kitchen, and a studio above the garage for whoever needs to disappear until supper.",
      features: ["Adaptive reuse of barn pad", "Lime plaster interiors", "Studio over the garage", "Leased hayfield income", "90 minutes from Grand Central"]
    }
  ]
};

function formatPrice(value) {
  if (value >= 1000000) {
    const m = value / 1000000;
    const shown = m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
    return "$" + shown + "M";
  }
  return "$" + value.toLocaleString("en-US");
}

function qs(name) {
  return new URLSearchParams(location.search).get(name) || "";
}

function filterHomes() {
  const location = qs("location").trim().toLowerCase();
  const type = qs("type");
  const collection = qs("collection");
  return GROVEWELL.properties.filter((item) => {
    const hay = (item.name + " " + item.location + " " + item.region + " " + item.tagline).toLowerCase();
    return (!location || hay.includes(location)) && (!type || item.type === type) && (!collection || item.collection === collection);
  });
}
