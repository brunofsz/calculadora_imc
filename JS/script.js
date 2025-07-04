// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
const tableImc = document.querySelector("#imcTable");
const inputAltura = document.querySelector("#height");
const inputPeso = document.querySelector("#weight");
const calcBtn = document.querySelector("#calcBtn");
const clearBtn = document.querySelector("#clearBtn");
const backBtn = document.querySelector("#back");
const spanIMC = document.querySelector("#imcNumber span");
const spanInfo = document.querySelector("#imcInfo span");

// Funções
function criaTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("tableData");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesidade = document.createElement("p");
    obesidade.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesidade);

    tableImc.appendChild(div);
  });
}

function addInfo(obj) {
  spanIMC.classList.add(obj.class);
  spanInfo.classList.add(obj.class);

  spanIMC.innerText = obj.imc;
  spanInfo.innerText = obj.info;
}

function clear() {
  inputAltura.value = "";
  inputPeso.value = "";
  spanIMC.classList = "";
  spanInfo.classList = "";
}

function validaDigitos(txt) {
  return txt.replace(/[^0-9,]/g, "");
}

function calcIMC(a, p) {
  const IMC = (p / (a * a)).toFixed(1);
  return IMC;
}

function esconde(n) {
  switch (n) {
    case 2:
      document.querySelector("#resultado").classList.add("hide");
      document.querySelector("#calculadora").classList.remove("hide");
      break;

    case 1:
      document.querySelector("#resultado").classList.remove("hide");
      document.querySelector("#calculadora").classList.add("hide");
      break;
  }
}

// Inicialização
criaTable(data);

// eventos

[inputAltura, inputPeso].forEach((el) => {
  el.addEventListener("input", (e) => {
    const valorAtual = validaDigitos(e.target.value);
    e.target.value = valorAtual;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const altura = +inputAltura.value.replace(",", ".");
  const peso = +inputPeso.value.replace(",", ".");

  if (!altura || !peso) return;

  const imc = calcIMC(altura, peso);

  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item;
    }
  });
  if (!info) return;

  switch (info.info) {
    case "Normal":
      info.class = "good";
      break;
    case "Magreza":
      info.class = "mid";
      break;
    case "Obesidade":
      info.class = "low";
      break;
    case "Sobrepeso":
      info.class = "mid";
      break;
    case "Obesidade grave":
      info.class = "high";
      break;
  }

  info.imc = imc;

  addInfo(info);
  esconde(1);
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
});

backBtn.addEventListener("click", () => {
  clear();
  esconde(2);
});
