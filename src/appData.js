export const CATEGORIES = {
  personalize: "Personalize",
  vans: "Vans",
  weapons: "Weapons",
  sensors: "Sensors",
};
// add userinput category and to display new input component instead of van categories
export const data = [
  {
    categories: [CATEGORIES.vans],
    title: "The A Team",
    image: "https://imgur.com/gallery/OSzSt",
    pros: ["stealth", "rocket launchers", "Mr. T"],
    cons: ["Mr. T's accent", "expensive"],
    blurb: "If you have a problem, if no one else can help, and if you can find them, maybe you can hire the A-Team",
    price: 5000,
  },
  {
    categories: [CATEGORIES.vans],
    title: "Mystery Machine",
    image: "https://imgur.com/gallery/pc0fqrb",
    pros: ["Scooby", "snacks", "mystery solvers"],
    cons: ["grass", "a little too cheap", "poor stealthing abilities"],
    blurb: "It's mean, it's green, it's the mystery machine!... and it's a Ford Transit",
    price: 1200,
  },
  {
    categories: [CATEGORIES.vans],
    title: "The Party Wagon",
    image: "https://static.wikia.nocookie.net/hotwheels/images/b/b5/2020NM26_%28Large%29.JPG/revision/latest/scale-to-width-down/1000?cb=20200329024016",
    pros: ["Nunchuks", "Swords", "Pizza"],
    cons: ["it's yellow", "fuel efficency"],
    blurb: "Turtles in a half shell... TURTLE POWER!",
    price: 188487
  },
  {
    categories: [CATEGORIES.vans],
    title: "Moody Spooky Van",
    image: "https://static.wikia.nocookie.net/hotwheels/images/b/b5/2020NM26_%28Large%29.JPG/revision/latest/scale-to-width-down/1000?cb=20200329024016",
    pros: ["invokes a sense of hmmmm...", "mysterious", "conjures ominous music"],
    cons: ["obviously up to something", "fuel efficency"],
    blurb: "This tall, dark, and handsome van can easily slip into the shadows and reappear on a whim. If you can't see it, it can see you",
    price: 14467
  },
  {
    categories: [CATEGORIES.weapons],
    title: "Rocket Launcher",
    image: "https://imgur.com/gallery/B1SpX2Z",
    pros: ["BAM", "no accuracy required", "Like, no accuracy at all"],
    cons: ["expensive", "loud", "slow reload"],
    blurb: "one stop problem solver",
    price: 3487,
    options: [{ title: "equipment", price: 3487 }, { title: "Assembly", price: 3000 }, { title: "Hole Cut", price: 4000 }],
  },
  {
    categories: [CATEGORIES.weapons],
    title: "Flame Thrower",
    image: "https://imgur.com/gallery/GJLKafT",
    pros: ["All of them", "fire", "throwing fire", "cool factor"],
    cons: ["None", "Range", "fuel economy", "diminishes visibility"],
    blurb: "NIAHAHAHAHHA - Skeletor",
    price: 4632
  },
  {
    categories: [CATEGORIES.weapons],
    title: "Paintball Gun",
    image: "https://imgur.com/gallery/WwooBND",
    pros: ["non-lethal", "price", "colour variety", "silent"],
    cons: ["non-lethal", "splatter",],
    blurb: "I love the smell of fresh paint in the morning",
    price: 65
  },
  {
    categories: [CATEGORIES.sensors],
    title: "Predator Vision",
    image: "https://imgur.com/gallery/WwooBND",
    pros: ["non-lethal", "sees all"],
    cons: ["limited colours", "heavy breathing",],
    blurb: "You're one ugly muthafokka",
    price: 76592
  },
  {
    categories: [CATEGORIES.sensors],
    title: "Animal",
    image: "https://imgur.com/gallery/WwooBND",
    pros: ["avoid bears", "safely enjoy picnic baskets"],
    cons: ["no bear sightings", "attracts deers (don't think about it)",],
    blurb: "🎶If you go out to the woods tonight your in for a big surprise🎶",
    price: 20592,
    // addonMutallyExclusive: false,
    addons: { bear: 3500, deer: 1500, aliens: 500 },
    // addons: { bear: {price: 3500, blurb: "more info here"}, deer: 1500, aliens: 500 },
  },
]

