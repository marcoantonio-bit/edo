function f(x,y,exp){
  return eval(exp);
}

let chart;

function calcular(){
  let exp = document.getElementById("func").value;
  let x = parseFloat(document.getElementById("x0").value);
  let yEuler = parseFloat(document.getElementById("y0").value);
  let yMejorado = yEuler;
  let yRK = yEuler;

  let h = parseFloat(document.getElementById("h").value);
  let n = parseInt(document.getElementById("n").value);

  let tabla = document.querySelector("#tabla tbody");
  tabla.innerHTML = "";

  let xs = [], euler = [], mejorado = [], rk = [];

  for(let i=0;i<n;i++){

    xs.push(x);
    euler.push(yEuler);
    mejorado.push(yMejorado);
    rk.push(yRK);

    // RK4
    let k1 = f(x, yRK, exp);
    let k2 = f(x + h/2, yRK + (h/2)*k1, exp);
    let k3 = f(x + h/2, yRK + (h/2)*k2, exp);
    let k4 = f(x + h, yRK + h*k3, exp);

    let yRK_next = yRK + (h/6)*(k1 + 2*k2 + 2*k3 + k4);

    // Euler
    let yE = yEuler + h * f(x,yEuler,exp);

    // Euler mejorado
    let k1m = f(x,yMejorado,exp);
    let k2m = f(x+h, yMejorado + h*k1m, exp);
    let yM = yMejorado + (h/2)*(k1m+k2m);

    let fila = `<tr>
      <td>${x.toFixed(2)}</td>
      <td>${yEuler.toFixed(4)}</td>
      <td>${yMejorado.toFixed(4)}</td>
      <td>${k1.toFixed(4)}</td>
      <td>${k2.toFixed(4)}</td>
      <td>${k3.toFixed(4)}</td>
      <td>${k4.toFixed(4)}</td>
      <td>${yRK.toFixed(4)}</td>
    </tr>`;

    tabla.innerHTML += fila;

    x += h;
    yEuler = yE;
    yMejorado = yM;
    yRK = yRK_next;
  }

  graficar(xs,euler,mejorado,rk);
}

function graficar(xs,euler,mejorado,rk){
  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("grafica"),{
    type:'line',
    data:{
      labels: xs,
      datasets:[
        {label:'Euler', data:euler},
        {label:'Mejorado', data:mejorado},
        {label:'RK4', data:rk}
      ]
    },
    options:{
      responsive:true
    }
  });
}