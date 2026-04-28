const base = "https://pokeapi.co/api/v2/";
const playBtn = document.getElementById("playBtn");

const getMonList = async (filter, name) => {
  let endpoint = "";

  if (filter === "type") endpoint = "type/"; //depending on the filter name, use a different endpoint
  else if (filter === "ability") endpoint = "ability/";
  else if (filter === "move") endpoint = "move/";
  else throw new Error("Invalid filter");

  const url = base + endpoint + name;

  try {
    const response = await fetch(url);
    const json = await response.json();

    let list = []; //this is the pokemon list that contains all the pokemon that fit the filter

    if (filter === "type" || filter === "ability") {
      list = json.pokemon.map(p => p.pokemon.name);
    } else if (filter === "move") { //move uses a different name 
      list = json.learned_by_pokemon.map(p => p.name);
    }

    return list; //sent to be processed of duplicates
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

    // Extract the pokemon info
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


const doEverything = async () => {
  const input = document.getElementById("inputField").value.trim(); //read the input field
  updateHistory(input)
  const filters = input.split(" "); //split the filters into a list to be processed 

  const allLists = []; //array list of arraylist, containing all pokemon for all filters

  for (let item of filters) {
    const index = item.indexOf("_");

    const filter = item.substring(0, index); //get the filter
    const name = item.substring(index + 1); //get the name

    //display Pokemon info if that is the filter
    if (filter === "pokemon") {
      const mondata = await getMonData(name);
      displayMonInfo(mondata);
      return; //end this function
    }

    const list = await getMonList(filter, name);
    allLists.push(list); //add the arraylist of arraylist
  }

  const finalList = findDuplicates(allLists);
  displayInfo(finalList);
};
playBtn.onclick = doEverything;