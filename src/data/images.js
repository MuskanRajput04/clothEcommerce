// Central image registry. Swap these ids for your own CDN paths later —
// every component pulls from here, so the whole site re-skins in one edit.

const BASE = "https://images.unsplash.com/";

export const img = (id, w = 900, h = 1200) =>
  `${BASE}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const IMG = {
  suitNavy: "photo-1756483509254-3cc48a5a15b2",
  kurtiRed: "photo-1759840278326-73f26ae8c5c7",
  kurtaWhite: "photo-1655288828238-21d86ec971c3",
  chikanWhite: "photo-1667665970124-2273c6ef3489",
  ivorySteps: "photo-1667665970118-f55705003914",
  tealDupatta: "photo-1780247585190-343fbb738c67",
  kurtiRose: "photo-1759840278381-bf7d5e332050",
  emeraldGown: "photo-1756483510767-35245638c057",
  sareePortrait: "photo-1612595391900-29390866733a",
  sareeOrange: "photo-1617627143750-d86bc21e42bb",
  sareePlum: "photo-1610030469983-98e550d6193c",
  festiveRed: "photo-1599462616558-2b75fd26a283",
  lehengaRed: "photo-1737515024776-03fed700028b",
  duoEthnic: "photo-1743750176861-d8e360c2e1ba",
  sareeWalk: "photo-1615573678157-69c7fce87d54",
  atelierRack: "photo-1724856604253-b65f8ec7d48b",
  zariDetail: "photo-1724856605022-106d6dd6e842",
  bridalWork: "photo-1724856604403-60304b28906c",
  bridalRed: "photo-1724856604254-f7cf4e9c8f72",
  floralFabric: "photo-1622780432053-767528938f34",
  sleeveDetail: "photo-1711044871601-301f9b0ecf91",
  jewellery: "photo-1606760227091-3dd870d97f1d",
};

// Tiny inline fallback so a blocked/offline image never shows a broken icon.
export const FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#F3EBE0'/><stop offset='1' stop-color='#E7DACA'/>
      </linearGradient></defs>
      <rect width='600' height='800' fill='url(#g)'/>
      <text x='300' y='400' font-family='Georgia,serif' font-size='34' fill='#B08542'
        text-anchor='middle' letter-spacing='6'>TUBA</text>
    </svg>`
  );
