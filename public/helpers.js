const displayInfo = (names) => {
  const Monlist = document.getElementById("Monlist");
  Monlist.innerHTML = "";

  names.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    Monlist.appendChild(li);
  });
};

const displayMonInfo = (monData) => {
  if (!monData) return;

  const imageDiv = document.getElementById("MonImage");
  const nameDiv = document.getElementById("MonName");
  const typeDiv = document.getElementById("MonType");
  const movesDiv = document.getElementById("MonMoves");

  // Clear previous content
  imageDiv.innerHTML = "";
  nameDiv.innerHTML = "";
  typeDiv.innerHTML = "";
  movesDiv.innerHTML = "";

  // 🖼️ Image
  const img = document.createElement("img");
  img.src = monData.image;
  img.alt = monData.name;
  imageDiv.appendChild(img);

  // 🏷️ Name
  nameDiv.textContent = monData.name;

  // 🔥 Types
  typeDiv.textContent = "Types: " + monData.types.join(", ");

  // ⚔️ Moves (limit to avoid huge list)
  const moveList = document.createElement("ul");

  monData.moves.slice(0, 10).forEach(move => {
    const li = document.createElement("li");
    li.textContent = move;
    moveList.appendChild(li);
  });

  movesDiv.appendChild(moveList);
};


const readInputField = () => {
    const test = document.getElementById("inputField").value;
    return test
}

const findDuplicates = (lists) => {
  if (lists.length === 0) return [];

  return lists.reduce((acc, curr) =>
    acc.filter(name => curr.includes(name))
  );
};