"use strict"
import "./style/index.scss";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


let btn = document.querySelector('.btn');
let totalEl  = document.querySelector('.insideText__total');
let data = [12, 17, 20, 50];
let total = data.reduce((a, b) => a + b, 0);

totalEl.innerHTML  = total;


function changeTotalFontSize() {
total.toString().length  >  4 ? document.querySelector('.insideText__total').style.fontSize = '13px' : document.querySelector('.insideText__total').style.fontSize = '33px';
}
changeTotalFontSize();


function getValues() {
  const vegetables = document.querySelector('.vegetables').value;
  const meat = document.querySelector('.meat').value;
  const bread = document.querySelector('.bread').value;
  const fish = document.querySelector('.fish').value;

  reRenderChart(Number(vegetables), Number(meat), Number(bread), Number(fish))
}
btn.addEventListener('click', getValues);


function reRenderChart(vegetables, meat, bread, fish) {
  myChart.data.datasets[0].data[2] = vegetables;
  myChart.data.datasets[0].data[0] = meat;
  myChart.data.datasets[0].data[1] = bread;
  myChart.data.datasets[0].data[3] = fish;

  total = myChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
  totalEl.innerHTML  = total;
  myChart.update()
  modal.style.display = "none";
  changeTotalFontSize();
}


let ctx = document.getElementById('myChart');

let myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: data,
      borderRadius: 50,
      borderWidth: 0,
      circumference: 370,
      cutout: "90%",
      spacing: -20,
      backgroundColor: [
        '#ffdb0d',
        '#0a8f8f',
        '#0a393b',
        '#bbe5ea'
      ],
    }]
  },

  plugins: [ChartDataLabels],
  options: {
    layout: {
      padding: {
        left: 30,
        right: 30,
        top: 25,
        bottom: 10
      }
    },

    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        anchor: 'start',
        backgroundColor: '#fff',
        color:  [
          '#ffdb0d',
          '#0a8f8f',
          '#0a393b',
          '#bbe5ea'
        ],
        borderRadius: 100,
        borderColor: [
          '#ffdb0d',
          '#0a8f8f',
          '#0a393b',
          '#bbe5ea'
        ],
        borderWidth: 5,
        padding: function(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            return value > 9 && value < 100  ? {
              left: 8,
              right: 8,
              top: 13,
              bottom: 13,
            } : 
            value > 99 ? {
              left: 5,
              right: 5,
              top: 12,
              bottom: 12,
            }  : {
              left: 12,
              right: 12,
              top: 13,
              bottom: 13,
            };
          },
        labels: {
          title: {
            font: {
              size: '12px',
              color: [
                '#ffdb0d',
                '#0a8f8f',
                '#0a393b',
                '#bbe5ea'
              ],
            }
          }
        },
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = Math.round(value * 100 / sum) + "%";
          return percentage;
        }
      }
    },
    animation: {
      animateRotate: true,
    }
  }
});


let modal = document.getElementById("myModal");
let openModal = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

openModal.onclick = function () {
  console.log('ds')
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}