const recipe1 = {
  _id: "6462a8f74c3d0ddd28897fcd",
  title: "Battenberg Cake",
  category: "Dessert",
  owner: "64c8d958249fae54bae90bb9",
  area: "British",
  instructions:
    "Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm…",
  description:
    "A classic British cake made with almond sponge cake and covered with m…",
  thumb: "https://ftp.goit.study/img/so-yummy/preview/Battenberg%20Cake.jpg",
  time: "60",
  ingredients: [
    {
      _id: "640c2dd963a319ea671e37aa",
      name: "Squid",
      desc: "A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png",
    },
    {
      _id: "640c2dd963a319ea671e37f5",
      name: "Cabbage",
      desc: "A leafy green or purple vegetable that is often used in salads, coleslaw, and stir-fry dishes, and is also commonly fermented into sauerkraut.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37f5.png",
    },
    {
      _id: "640c2dd963a319ea671e3665",
      name: "Baking Powder",
      desc: "Baking powder is a dry chemical leavening agent, a mixture of a carbonate or bicarbonate and a weak acid. The base and acid are prevented from reacting prematurely by the inclusion of a buffer such as cornstarch. Baking powder is used to increase the volume and lighten the texture of baked goods. It works by releasing carbon dioxide gas into a batter or dough through an acid-base reaction, causing bubbles in the wet mixture to expand and thus leavening the mixture. The first single-acting baking powder was developed by Birmingham based food manufacturer Alfred Bird in England in 1843. The first double-acting baking powder was developed by Eben Norton Horsford in America in the 1860s.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3665.png",
    },
  ],
};
const recipe2 = {
  _id: "6462a8f74c3d0ddd28897fbc",
  title: "Irish stew",
  category: "Beef",
  owner: "64c8d958249fae54bae90bb9",
  area: "Irish",
  instructions:
    "Heat the oven to 180C/350F/gas mark 4. Drain and rinse the soaked whea…",
  description:
    "A traditional Irish dish made with lamb, potatoes, carrots, onions, an…",
  thumb: "https://ftp.goit.study/img/so-yummy/preview/Irish%20stew.jpg",
  time: "160",
  ingredients: [
    {
      _id: "640c2dd963a319ea671e37aa",
      name: "Squid",
      desc: "A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png",
    },
    {
      _id: "640c2dd963a319ea671e37f5",
      name: "Cabbage",
      desc: "A leafy green or purple vegetable that is often used in salads, coleslaw, and stir-fry dishes, and is also commonly fermented into sauerkraut.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37f5.png",
    },
    {
      _id: "640c2dd963a319ea671e3665",
      name: "Baking Powder",
      desc: "Baking powder is a dry chemical leavening agent, a mixture of a carbonate or bicarbonate and a weak acid. The base and acid are prevented from reacting prematurely by the inclusion of a buffer such as cornstarch. Baking powder is used to increase the volume and lighten the texture of baked goods. It works by releasing carbon dioxide gas into a batter or dough through an acid-base reaction, causing bubbles in the wet mixture to expand and thus leavening the mixture. The first single-acting baking powder was developed by Birmingham based food manufacturer Alfred Bird in England in 1843. The first double-acting baking powder was developed by Eben Norton Horsford in America in the 1860s.",
      img: "https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3665.png",
    },
  ],
};

const recipesArray = [recipe1, recipe2, recipe1, recipe2, recipe1, recipe2];

export const recipesExample = {
  items: recipesArray,
  hasPreviousPage: false,
  hasNextPage: false,
  page: 1,
  totalPages: 1,
  totalItems: recipesArray.length,
};
