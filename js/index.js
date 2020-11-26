'use strict'

let vector = [];
let matriz = [];

const crearArray = () => {
  const fc = parseInt(document.getElementById("fc").value);
  const doc = document.getElementById("stock");
  document.getElementById("messages-important").innerHTML = "";
  if (fc >= 21) {
    return document.getElementById("stock").innerHTML = "LO SENTIMOS NO TENEMOS SOPORTE PARA MATRICES TAN GRANDES";
  }
  doc.innerHTML = "";
  let numInputs = 1;
  let val = 1;
  let range = 1;
  for (let i = 0; i < fc + 1; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < fc + 1; ++j) {
      if (i !== 0 && j !== 0) {
        doc.innerHTML += `<input type="number" id="input${numInputs}" min="0" max="1" class="inputs-array">`
        numInputs++;
      } else {
        if (i === 0 && j === 0) {
          doc.innerHTML += `<input id="vals" class="inputs-array" value="n">`;
          continue;
        }
        if (i !== 0) {
          doc.innerHTML += `<input id="val${val}" class="inputs-array" value="${range}">`;
        }
        if (j !== 0) {
          doc.innerHTML += `<input id="val${val}" class="inputs-array" value="${range}">`;
        }
        val++;
        range++;
        if (range - 1 === fc) {
          range = 1;
        }
      }
    }
    doc.innerHTML += `</div>`
  }
}

const calcular = () => {
  const mfc = document.getElementById("fc").value;
  let k = 0;
  let l = 0;
  let fc = 0;
  (mfc > 0)
    ? fc = mfc
    : fc = matriz.length;
  matriz = [];
  for (let i = 0; i < fc; ++i) {
    matriz.push([]);
  }
  for (let i = 0; i < fc * fc; ++i) {
    matriz[l][k] = parseInt(document.getElementById(`input${i+1}`).value);
    k++;
    if (k == fc) {
      k = 0;
      l++;
    }
  }
  const messages = document.getElementById("messages-important");
  messages.innerHTML = "";
  (reflexivo(matriz))
    ? messages.innerHTML += "<p>SI ES REFLEXIVO</p>"
    : messages.innerHTML += "<p>NO ES REFLEXIVO</p>";
  (irreflexivo(matriz))
    ? messages.innerHTML += "<p>SI ES IRREFLEXIVO</p>"
    : messages.innerHTML += "<p>NO ES IRREFLEXIVO</p>";
  (simetrica(matriz))
    ? messages.innerHTML += "<p>SI ES SIMETRICA</p>"
    : messages.innerHTML += "<p>NO ES SIMETRICA</p>";
  (asimetrica(matriz))
    ? messages.innerHTML += "<p>SI ES ASIMETRICA</p>"
    : messages.innerHTML += "<p>NO ES ASIMETRICA</p>";
  (antisimetrica(matriz))
    ? messages.innerHTML += "<p>SI ES ANTISIMETRICA</p>"
    : messages.innerHTML += "<p>NO ES ANTISIMETRICA</p>";
  (transitiva(matriz))
    ? messages.innerHTML += "<p>SI ES TRANSITIVA</p>"
    : messages.innerHTML += "<p>NO ES TRANSITIVA</p>";
  console.log(matriz);
}

const generarMatriz = () => {
  if (!validateSecond()) {
    return document.getElementById("messageValid2").innerHTML = "NO SE PUEDE GENERAR LA MATRIZ";
  } else {
    document.getElementById("messageValid2").innerHTML = "SI SE PUDO GENERAR LA MATRIZ";
  }
  const n = vector.length;
  const value1 = document.getElementById("expression9").value;
  const condition2 = document.getElementById("expression8").value;
  let text = document.getElementById("expression7").value;
  text += "=" + value1;
  matriz = [];
  for (let i = 0; i < n; ++i) {
    matriz.push([]);
  }
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      const x = "x=" + vector[i];
      const solution = nerdamer.solveEquations([text, x]);
      let relacion = 0;
      console.log(solution);
      if (condition2 === ">") {
        if (solution[1][1] < vector[j]) {
          relacion = 1;
        }
      } else if (condition2 === ">=") {
        if (solution[1][1] <= vector[j]) {
          relacion = 1;
        }
      } else if (condition2 === "=") {
        if (solution[1][1] <= vector[n - 1] && solution[1][1] >= vector[0]) {
          relacion = 1;
        }
      } else if (condition2 === "<") {
        if (solution[1][1] > vector[j]) {
          relacion = 1;
        }
      } else {
        if (solution[1][1] >= vector[j]) {
          relacion = 1;
        }
      }
      matriz[i][j] = relacion;
    }
  }
  const doc = document.getElementById("stock");
  let numInputs = 1;
  let val = 1;
  doc.innerHTML = "";
  if (fc >= 21) {
    return document.getElementById("stock").innerHTML = "LO SENTIMOS NO TENEMOS SOPORTE PARA MATRICES TAN GRANDES";
  }
  for (let i = 0; i < n + 1; ++i) {
    doc.innerHTML += `<div>`
    for (let j = 0; j < n + 1; ++j) {
      if (i !== 0 && j !== 0) {
        doc.innerHTML += `<input type="number" id="input${numInputs}" min="0" max="1" value="${matriz[i-1][j-1]}" class="inputs-array">`
        numInputs++;
      } else {
        if (i === 0 && j === 0) {
          doc.innerHTML += `<input id="val${0}" class="inputs-array" value="n">`;
          continue;
        }
        if (i !== 0) {
          doc.innerHTML += `<input id="val${val}" class="inputs-array" value="${vector[i-1]}">`;
        }
        if (j !== 0) {
          doc.innerHTML += `<input id="val${val}" class="inputs-array" value="${vector[j-1]}">`;
        }
        val++;
      }
    }
    doc.innerHTML += `</div>`
  }
  console.log(matriz);
}

const generarVector = () => {
  if (!validateFirst()) {
    return document.getElementById("messageValid").innerHTML = "NO SE PUEDE GENERAR LA VECTOR";
  } else {
    document.getElementById("messageValid").innerHTML = "SI SE PUDO GENERAR LA VECTOR";
  }
  const mostrar = document.getElementById("expression-preview-ruler");
  const title = document.getElementById("title-expression")
  const text = document.getElementById("expression3").value;
  const value1 = document.getElementById("expression1").value;
  const value2 = document.getElementById("expression5").value;
  const condition1 = document.getElementById("expression2").value;
  const condition2 = document.getElementById("expression4").value;
  const solve1 = value1 + " = "+ text;
  const solve2 = value2 + " = "+ text;
  const solution1 = nerdamer.solve(solve1, 'x');
  const solution2 = nerdamer.solve(solve2, 'x');
  let principio = solution1.symbol.elements[0].multiplier.num.value /
    solution1.symbol.elements[0].multiplier.den.value;
  let final = solution2.symbol.elements[0].multiplier.num.value /
    solution2.symbol.elements[0].multiplier.den.value;
  vector = [];
  if (condition1 === "<=" && condition2 === "<=") {
    for (let i = Math.ceil(principio); i <= Math.floor(final); ++i) {
      vector.push(i);
    }
  } else if (condition1 === "<=" && condition2 === "<") {
    let ok = (Math.floor(final) === final);
    if(!ok)
      final = Math.ceil(final)
    for (let i = Math.ceil(principio); i < final; ++i) {
      vector.push(i);
    }
  } else if (condition1 === "<" && condition2 === "<=") {
    let ok = (Math.floor(principio) === principio)
    if(!ok)
      principio = Math.ceil(principio)
    else
      principio++;
    for (let i = principio; i <= Math.floor(final); ++i) {
      vector.push(i);
    }
  } else {
    let ok = (Math.floor(final) === final);
    let ans = (Math.floor(principio) === principio);
    if(!ok)
      final = Math.ceil(final);
    if(!ans)
      principio = Math.ceil(principio)
    else
      principio++;
    for (let i = principio; i < final; ++i) {
      vector.push(i);
    }
  }
  title.innerHTML = "Estos son los valores que cumplen la condición anterior"
  mostrar.innerHTML = "";
  for (let i = 0; i < vector.length - 1; ++i) {
    mostrar.innerHTML += `<p style="font-size: 3.2rem;">{${vector[i]}},</p>`
  }
  mostrar.innerHTML += `<p style="font-size: 3.2rem;">{${vector[vector.length - 1]}}</p>`
  console.log(vector);
  //return vector;
}

const reflexivo = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    if (matriz[i][i] === 1) {
      count++;
    }
  }
  return (count === fc)
    ? true
    : false;
}

const irreflexivo = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let fc = matriz.length;
  let count = 0;
  for (let i = 0; i < fc; ++i) {
    if (matriz[i][i] === 0) {
      count++;
    }
  }
  return (count === fc)
    ? true
    : false;
}

const simetrica = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matriz[i][j] !== matriz[j][i]) {
        ok = false;
        break;
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const asimetrica = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  if (!irreflexivo(matriz)) {
    return !ok;
  }
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i !== j) {
        if (matriz[i][j] === matriz[j][i] && matriz[i][j] !== 0 && matriz[j][i] !== 0) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const antisimetrica = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let ok = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i !== j) {
        if (matriz[i][j] === matriz[j][i] && matriz[i][j] !== 0 && matriz[j][i] !== 0) {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      break;
    }
  }
  return (ok)
    ? true
    : false;
}

const transitiva = (matriz=[]) => {
  if (!matriz.length) {
    return console.error("Error no puede ingresar una matriz nula");
  }
  let transitividad = true;
  let n = matriz.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matriz[i][j] === 1) {
        for (let k = 0; k < n; ++k) {
          if (matriz[j][k] === 1 && matriz[i][k] === 0) {
            transitividad = false;
            break;
          }
        }
      }
      if (!transitividad) {
        break;
      }
    }
    if (!transitividad) {
      break;
    }
  }
  return (transitividad)
    ? true
    : false;
}
