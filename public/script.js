const base = "https://pokeapi.co/api/v2/";
const playBtn = document.getElementById("playBtn");

const getMonList = async (filter, name) => {
  let getMonListEndpoint = "";

  if (filter === "type") {
    getMonListEndpoint = "type/";
  } else if (filter === "ability") {
    getMonListEndpoint = "ability/";
  } else if (filter === "moves") {
    getMonListEndpoint = "move/";
  } else {
    throw new Error("Error: Invalid filter");
  }

  const urltofetch = base + getMonListEndpoint + name;

  try {
    const response = await fetch(urltofetch);

    if (response.ok) {
      const jsonResponse = await response.json();

      const monList = jsonResponse.pokemon;

      const names = monList.map(entry => entry.pokemon.name);

      //console.log(names);

      return monList;
    }
  } catch (error) {
    console.log(error);
  }
};

const showMons = async () => { //24
  const Monlist = document.getElementById("Monlist");

  const daList = getMonList()

  displayInfo(daList)
}

//getMonList("ability", "intimidate");

playBtn.onclick = readInputField;