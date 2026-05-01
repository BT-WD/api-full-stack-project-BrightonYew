const displayInfo = (names) => {
  const results = document.getElementById("Results");


  const imageDiv = document.getElementById("MonImage");
  const nameDiv = document.getElementById("MonName");
  const typeDiv = document.getElementById("MonType");
  const movesDiv = document.getElementById("MonMoves");


  imageDiv.innerHTML = "";
  nameDiv.innerHTML = "";
  typeDiv.innerHTML = "";
  movesDiv.innerHTML = "";


  results.innerHTML = "";

  names.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    results.appendChild(li);
  });
};

const displayMonInfo = (monData) => {
  if (!monData) return;

  const imageDiv = document.getElementById("MonImage");
  const nameDiv = document.getElementById("MonName");
  const typeDiv = document.getElementById("MonType");
  const movesDiv = document.getElementById("MonMoves");
  const results = document.getElementById("Results");

  //const Monlist = document.getElementById("Monlist");
  results.innerHTML = "";

  // Clear previous content
  imageDiv.innerHTML = "";
  nameDiv.innerHTML = "";
  typeDiv.innerHTML = "";
  movesDiv.innerHTML = "";

  //Image
  const img = document.createElement("img");
  img.src = monData.image;
  img.alt = monData.name;
  imageDiv.appendChild(img);

  //Name
  nameDiv.textContent = monData.name;

  //Types
  typeDiv.textContent = "Type(s): " + monData.types.join(", ");

  //Moves
  const moveList = document.createElement("ul");

  monData.moves.slice(0, 1000).forEach(move => { //create new lines
    const li = document.createElement("li");
    li.textContent = move;
    moveList.appendChild(li);
  });

  movesDiv.appendChild(moveList);
};

const findDuplicates = (lists) => {
  if (lists.length === 0) return [];

  return lists.reduce((acc, curr) =>
    acc.filter(name => curr.includes(name))
  );
};

const updateHistory = (query) => {
  const history = document.getElementById("History");
  history.append("\n" + query)
}