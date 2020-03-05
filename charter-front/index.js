const dataWindowSize = 10;

const labels = [];
for (let i = 1; i <= dataWindowSize; i++) { labels.push(i); }

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: []
    },
    options: {}
});

var backendSocket = new WebSocket("ws://localhost:3000/socket");

const updateDatasets = data => {
  Object.keys(data).forEach(datasetName => {
    if (chart.data.datasets.every(chartDataset => {
      return chartDataset.label !== datasetName;
      })) {
      const red = Math.random() * 255;
      chart.data.datasets.push({
        label: datasetName,
        backgroundColor: 'rgba(' + red + ', 99, 132, 0.9)',
        borderColor: 'rgb(' + red + ', 99, 132)',
        data: []
      });
    }
  });
};

backendSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  updateDatasets(data);

  Object.keys(data).forEach(datasetName => {
    dataset = chart.data.datasets.find(dataset => dataset.label === datasetName).data;
    if (dataset.length > dataWindowSize) {
      dataset.shift();
    }
    dataset.push(data[datasetName]);
  });

  chart.update();
};