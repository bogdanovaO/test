"use strict"
import "./style/index.scss";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import 'chartjs-plugin-doughnutlabel';

const btn = document.querySelector('.btn');
const totalEl  = document.querySelector('.insideText__total');
let data = [12, 17, 20, 50];


let total = data.reduce((a, b) => a + b, 0);
totalEl.innerHTML  = total;

btn.addEventListener('click', getValues);

function getValues() {
  const vegetables = document.querySelector('.vegetables').value;
  const meat = document.querySelector('.meat').value;
  const bread = document.querySelector('.bread').value;
  const fish = document.querySelector('.fish').value;

  myChart.data.datasets[0].data[2] = Number(vegetables);
  myChart.data.datasets[0].data[0] = Number(meat);
  myChart.data.datasets[0].data[1] = Number(bread);
  myChart.data.datasets[0].data[3] = Number(fish);
  
  const total = myChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
  totalEl.innerHTML  = total;
  console.log(total)
  
  myChart.update()
  modal.style.display = "none";
}
// function getTotal() {
// 	var sum = myChart.data.datasets[0].data.reduce((a, b) => a + b, 0);
// 	return `Total: ${sum}`;
// }

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'doughnut',

  data: {
    // labels: ['January', 'February', 'March', 'April'],
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
        bottom: 0
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
        borderRadius: 100,
        borderColor: [
          '#ffdb0d',
          '#0a8f8f',
          '#0a393b',
          '#bbe5ea'
        ],
        borderWidth: 5,
        padding: {
          left: 8,
          right: 8,
          top: 13,
          bottom: 13,
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





// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let openModal = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
openModal.onclick = function () {
  console.log('ds')
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}