export const CATEGORIES = ["Smart Home","Audio","Fitness","Desk Setup","Home Upgrade","Beauty","Travel","Gaming"];
const img = (id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
type Seed = [string,string,string,number,number,string[],number,string];
const RAW: Seed[] = [
["AuroraPods Pro Wireless Earbuds","Audio","Noise-cancelling earbuds with 36h case, spatial audio and wireless charging.",19.99,49.99,[img("photo-1590658268037-6bf12165a8df"),img("photo-1606220945770-b5b6c2c55bf1")],1842,"Trending"],
["Nebula Galaxy Projector 2.0","Smart Home","Turn any ceiling into a drifting nebula with app scenes, music sync and timer.",24.5,59.99,[img("photo-1519681393784-d120267933ba"),img("photo-1531297484001-80022131f5a1")],2310,"Trending"],
["LumaDesk RGB Light Bar","Desk Setup","Monitor light bar with auto-dimming, no glare and sunrise wake mode.",18.75,42, [img("photo-1593062096033-9a26b09da705"),img("photo-1547394765-185e1e68f34e")],967,"New"],
["FlexCore Smart Posture Trainer","Fitness","Wearable posture coach that vibrates gently when you slouch.",16.2,39.99,[img("photo-1571019613454-1cb2f99b2d8b"),img("photo-1517836357463-d25dfeac3438")],743,"Trending"],
["HydroGlow Smart Bottle 1L","Fitness","Glows to remind you to drink, tracks intake in the app, keeps cold 24h.",14.99,34.99,[img("photo-1602143407151-7111542de6e8"),img("photo-1523362628745-0c100150b504")],1204,""],
["SnapMag 3-in-1 Charging Dock","Travel","Fold-flat MagSafe dock for phone, watch and buds. TSA-friendly.",21,49,[img("photo-1583863788434-e58a36330cf0"),img("photo-1600490722773-35753aea6332")],1588,"Trending"],
["ErgoFlow Laptop Stand","Desk Setup","CNC aluminium stand, 6 angles, folds to 12mm for your bag.",22.4,54,[img("photo-1527864550417-7fd91fc51a46"),img("photo-1496181133206-80ce9b88a853")],632,""],
["AquaMist Humidifier Mini","Home Upgrade","Whisper-quiet 500ml humidifier with aurora night light.",15.5,36,[img("photo-1608571423902-eed4a5ad8108"),img("photo-1586023492125-27b2c045efd7")],891,"Low stock"],
["PulseBand Sleep & Fitness Tracker","Fitness","Sleep, HRV, SpO2 and 14-day battery in a feather-light band.",26,69,[img("photo-1575311373937-040b8e1fd5b6"),img("photo-1434682881908-b43d0467b798")],1750,"Trending"],
["Orbit Wireless Mechanical Keyboard","Gaming","Hot-swap gasket keyboard with tri-mode connect and PBT caps.",38,89,[img("photo-1618384887929-16ec33fab9ef"),img("photo-1541140532154-b024d705b90a")],544,"New"],
["GlowSkin LED Therapy Mask","Beauty","Red + blue light therapy at home, 10-min auto sessions.",32,79,[img("photo-1596704017254-9b121068fb31"),img("photo-1570172619644-dfd03ed5d881")],428,"New"],
["Voyager Anti-Theft Backpack","Travel","Slash-proof, USB pass-through, hidden pockets, fits 16-inch laptop.",29.99,69.99,[img("photo-1553062407-98eeb64c6a62"),img("photo-1547949003-9792a18a2601")],1120,""],
["SmartPlug Energy Duo (2-pack)","Smart Home","Track energy per appliance, schedules and voice control.",13.99,29.99,[img("photo-1558089687-f282ffcbc126"),img("photo-1543512214-318c7553f230")],2033,""],
["ZenStone Sunrise Alarm Clock","Home Upgrade","Wake to a gradual sunrise and nature sounds, not a jolt.",19.5,45,[img("photo-1563861826100-9cb868fdbe1c"),img("photo-1501139083538-0139583c060f")],765,""],
["ProGrip Phone Gimbal Mini","Travel","3-axis stabilizer that folds into your pocket. Face tracking.",34,79,[img("photo-1516035069371-29a1b244cc32"),img("photo-1495121605193-b116b5b9c5fe")],389,"New"],
["AirFlex Resistance Band Set","Fitness","5 stackable bands to 150lb with door anchor and app workouts.",12.99,29.99,[img("photo-1598289431512-b97b0917affc"),img("photo-1599058917212-d750089bc07e")],1467,""],
["DeskPods Cable Organizer Kit","Desk Setup","Magnetic cable anchors + braided sleeves for a clean desk.",9.99,24.99,[img("photo-1583394293214-28ded15ee548"),img("photo-1593642632823-8f785ba67e45")],987,""],
["CrystalSound Shower Speaker","Audio","IPX7 waterproof speaker with suction mount and LED ring.",16.99,39,[img("photo-1608043152269-423dbba4e7e1"),img("photo-1545454675-3531b543be5d")],654,"Low stock"],
["TempTune Smart Mug Warmer","Desk Setup","Keeps coffee at your perfect temp, auto on/off, gravity switch.",17.5,39.95,[img("photo-1514228742587-6b1558fcca3d"),img("photo-1495474472287-4d71bcdd2085")],823,""],
["NightDrive Car Ambient Kit","Travel","App-controlled interior glow, music sync, easy USB install.",15.99,34.99,[img("photo-1502877338535-766e1452684a"),img("photo-1493238792000-8113da705763")],578,""],
["PureAir Desktop Purifier","Home Upgrade","HEPA-13 desktop purifier for desk and bedroom, USB-C.",23,52,[img("photo-1585771724684-38269d6639fd"),img("photo-1603712725038-e9334ae8f39f")],712,""],
["FlexiMount Tablet Pillow Stand","Home Upgrade","Hands-free tablet stand for bed, couch and kitchen recipes.",11.99,27,[img("photo-1544244015-0df4b3ffc6b0"),img("photo-1589739900266-43b2843f4c12")],445,"Gift"],
["SonicClean Electric Brush Pro","Beauty","5 modes, smart timer, 60-day battery, 4 heads included.",18.99,44,[img("photo-1559671213024-138cfb168162"),img("photo-1607613009820-a29f7bb81c04")],1320,""],
["MagSnap Car Vent Mount","Travel","One-tap magnetic mount, strongest hold over bumps.",9.5,22,[img("photo-1586953208448-b95a79798f07"),img("photo-1449965408869-eaa3f722e40d")],1890,"Under $20"],
["LumenTrail Camping Lantern","Travel","Solar + USB lantern, power-bank out, packs flat.",13.5,29,[img("photo-1504280390367-361c6d9f38f4"),img("photo-1478131143081-80f7f84ca84d")],367,""],
["StudioMic USB Podcast Mic","Gaming","Cardioid clarity, tap-to-mute, zero-latency monitor.",27,59,[img("photo-1590602847861-f357a9332bbc"),img("photo-1478737270239-2f02b77fc618")],598,"New"],
["HydraMassage Gun Mini","Fitness","Pocket percussion massager, 4 heads, quiet brushless motor.",29,65,[img("photo-1620188467120-5042ed1eb5da"),img("photo-1544367567-0f2fcb009e0b")],934,"Trending"],
["SmartMirror LED Vanity","Beauty","Dimmable vanity mirror with magnification and travel case.",21.99,49,[img("photo-1522337660859-02fbefca4702"),img("photo-1487412947147-5cebf100ffc2")],512,"Gift"],
["PixelFrame Digital Photo Frame","Smart Home","Send photos from anywhere, auto-brightness, family sharing.",33,75,[img("photo-1513519245088-0e12902e5a38"),img("photo-1519710164239-da123dc03ef4")],276,"Gift"],
["GripGo Controller Charging Dock","Gaming","Dual dock with cooling fan and RGB, for PS/Xbox pads.",19,42,[img("photo-1606813907291-d86efa9b94db"),img("photo-1592840496694-26d035b52b48")],701,""],
["AromaPods Shower Steamers 12pk","Beauty","Eucalyptus spa steamers — the gift everyone actually uses.",8.99,19.99,[img("photo-1540555700478-4be289fbecef"),img("photo-1600334129128-685c5582fd35")],2150,"Under $20"],
["FoldFlat Storage Cubes 6pk","Home Upgrade","Instant closet glow-up, clear windows, reinforced handles.",16.5,37,[img("photo-1586023492125-27b2c045efd7"),img("photo-1595428774223-ef52624120d2")],845,""],
["ChargeHub 65W GaN Charger","Travel","Charge laptop + 2 devices, folds flat, cool-running GaN.",18,39,[img("photo-1583863788434-e58a36330cf0"),img("photo-1615526675159-e248c3021d3f")],1678,"Trending"],
["WaveSound Sleep Earbuds","Audio","Tiny side-sleeper buds with masking sounds and 28h case.",22.99,54,[img("photo-1572569511254-d8f925fe2cbb"),img("photo-1484704849700-f032a568e944")],623,"New"],
["PosturePerfect Chair Cushion","Desk Setup","Memory-foam coccyx cushion for all-day comfort.",17.99,39,[img("photo-1589384267710-7a25bc159f3d"),img("photo-1503602642458-232111445657")],789,""],
["RoboVac Mini Desk Vacuum","Desk Setup","Tiny robot that eats crumbs and eraser dust off your desk.",12.5,26,[img("photo-1558317374-067fb5f30001"),img("photo-1581578731548-c64695cc6952")],1045,"Gift"],
["ThermoPrint Mini Label Maker","Home Upgrade","Bluetooth label printer, no ink, tons of templates.",19.99,44,[img("photo-1612815154858-60aa4c59eaa6"),img("photo-1562564055-71e051d33c19")],456,"New"],
["SunChaser Solar Power Bank","Travel","20,000mAh solar bank with flashlight and dual USB-C.",21.5,47,[img("photo-1619489646924-b4fce76b1db5"),img("photo-1509391366360-2e959784a276")],892,""],
["BeatBar Soundbar Mini","Audio","Room-filling mini soundbar for TV and desk, optical + BT.",28,62,[img("photo-1545454675-3531b543be5d"),img("photo-1595246140625-573b715d11dc")],534,""],
["FocusTimer Pomodoro Cube","Desk Setup","Flip to start 25/50/90-min focus, gentle vibration done.",11.5,25,[img("photo-1501139083538-0139583c060f"),img("photo-1434056886845-dac89ffe9b56")],678,"Under $20"],
["CoolMist Personal Fan Pro","Home Upgrade","Neck fan, bladeless, 78 air outlets, 16h battery.",14.5,32,[img("photo-1565151443833-29bf2ba5dd8d"),img("photo-1520262454473-a1a82276a574")],1234,"Low stock"],
["GameLight Reactive Wall Panels","Gaming","Music-reactive hex panels, app scenes, modular.",36,84,[img("photo-1550745165-9bc0b252726f"),img("photo-1542751371-adc38448a05e")],423,"Trending"],
["SleepSound White Noise Machine","Home Upgrade","32 non-looping sounds, auto-dim, baby-safe volume.",15,34,[img("photo-1541781774459-bb2af2f05b55"),img("photo-1511296265581-c2450046447d")],967,"Gift"],
["TravelCube Compression Set","Travel","Pack 30% more, see everything, ripstop and waterproof.",17,38,[img("photo-1488646953014-85cb44e25828"),img("photo-1476514525535-07fb3b4ae5f1")],1102,""],
];
export const seedProducts = RAW.map(([title,category,description,cost,retail,images,sold,badge],i)=>{
  const price = Math.round((cost*2.1)*100)/100; const compareAt = Math.round(retail*100)/100;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  return { slug, title, description: description+" Ships directly from our vetted supplier partner with tracked delivery in 5–10 business days. 30-day easy returns, always.", category, price, compareAt, cost, shippingCost: 2.4, images, rating: Math.round((4.3+((i*7)%6)/10)*10)/10, reviewsCount: 40+((i*37)%420), stock: badge==="Low stock"?4+ (i%4): 24+((i*13)%80), supplier: i%3===0?"CJ Demo Supplier": i%3===1?"Spocket Demo":"AliDemo (Mock)", supplierSku:`SUP-${1000+i}`, badges: [badge, i%5===0?"New":price<20?"Under $20":""].filter(Boolean), deliveryMin:5, deliveryMax:10, variants:[{name:"Color",options:["Midnight","Cloud White","Aurora Violet"]},{name:"Size",options:["Standard","Pro / Large"]}], colors:["#0B0B1E","#F2F2FA","#5B3DF5"], sold, featured: i<8 };
});
export const seedCollections = [
{slug:"under-20",title:"Under $20",description:"Big upgrades, tiny prices. Everything under twenty bucks.",image:img("photo-1556742049-0cfed4f6a45d"),emoji:"💸",rule:"under20"},
{slug:"gift-ideas",title:"Gift Ideas",description:"Gifts people actually keep — under $35 and ready to delight.",image:img("photo-1513201099705-a9746e1e201f"),emoji:"🎁",rule:"gift"},
{slug:"desk-setup",title:"Desk Setup",description:"Build the desk setup your back (and feed) will thank you for.",image:img("photo-1593062096033-9a26b09da705"),emoji:"🖥️",rule:"desk"},
{slug:"fitness-recovery",title:"Fitness & Recovery",description:"Train smarter, recover faster, at home.",image:img("photo-1571019613454-1cb2f99b2d8b"),emoji:"💪",rule:"fitness"},
{slug:"smart-home",title:"Smart Home",description:"Small devices, noticeably smarter rooms.",image:img("photo-1558089687-f282ffcbc126"),emoji:"🏠",rule:"smarthome"},
{slug:"new-drops",title:"New Drops",description:"Fresh from suppliers this week — be first.",image:img("photo-1441986300917-64674bd600d8"),emoji:"✨",rule:"new"},
];
export const PROMOS = [
{code:"WELCOME10",type:"percent",value:10},{code:"NOVA20",type:"percent",value:20},{code:"FREESHIP",type:"freeship",value:0},
];
export const SUPPLIER_CATALOG = seedProducts.slice(0,18).map((p,i)=>({...p, supplierPrice: Math.round(p.cost*(0.92+(i%5)*0.04)*100)/100, supplierStock: 40+i*7, source:"DemoSupplier API v2"}));
export function margin(p:{price:number;cost:number;shippingCost:number}){ const fee=p.price*0.029+0.3; const profit=p.price-p.cost-p.shippingCost-fee; return {fee:Math.round(fee*100)/100, profit:Math.round(profit*100)/100, marginPct: p.price? Math.round(profit/p.price*100):0}; }
