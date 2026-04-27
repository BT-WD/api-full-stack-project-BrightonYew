const base = "https://pokeapi.co/api/v2/";
const playBtn = document.getElementById("playBtn");

const getMonList = async (filter, name) => {
  let endpoint = "";

  if (filter === "type") endpoint = "type/";
  else if (filter === "ability") endpoint = "ability/";
  else if (filter === "move") endpoint = "move/";
  else throw new Error("Invalid filter");

  const url = base + endpoint + name;

  try {
    const response = await fetch(url);
    const json = await response.json();

    let list = [];

    if (filter === "type" || filter === "ability") {
      list = json.pokemon.map(p => p.pokemon.name);
    } else if (filter === "move") {
      list = json.learned_by_pokemon.map(p => p.name);
    }

    return list;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getMonData = async (name) => {
  const url = base + "pokemon/" + name;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Extract what you need
    const monData = {
      name: data.name,

      image: data.sprites.front_default,

      types: data.types.map(t => t.type.name),

      moves: data.moves.map(m => m.move.name)
    };

    return monData;

  } catch (error) {
    console.log(error);
    return null;
  }
};

const showMons = async () => { //24
  const Monlist = document.getElementById("Monlist");

  const daList = await getMonList()

  displayInfo(await daList)
}

//getMonList("ability", "intimidate");

const doEverything = async () => {
  const input = document.getElementById("inputField").value.trim();
  const filters = input.split(" ");

  const allLists = [];

  for (let item of filters) {
    const index = item.indexOf("_");

    const filter = item.substring(0, index);
    const name = item.substring(index + 1);

    // special case: single Pokémon lookup
    if (filter === "pokemon") {
      const mondata = await getMonData(name);
      displayMonInfo(mondata);
      return;
    }

    const list = await getMonList(filter, name);
    allLists.push(list);
  }

  const finalList = findDuplicates(allLists);
  displayInfo(finalList);
};
playBtn.onclick = doEverything;