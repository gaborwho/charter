var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: []
    },
    options: {}
});
var i = 0;

var backendSocket = new WebSocket("ws://localhost:3000/socket");

const updateDatasets = data => {
  Object.keys(data).forEach(datasetName => {
    if (chart.data.datasets.every(chartDataset => {
      return chartDataset.label !== datasetName;
      })) {
      chart.data.datasets.push({
        label: datasetName,
        backgroundColor: 'rgba(155, 99, 132, 0.9)',
        borderColor: 'rgb(155, 99, 132)',
        data: []
      });
    }
  });
};

backendSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  updateDatasets(data);

  chart.data.labels.push("dataset " + i);
  i++;

  Object.keys(data).forEach(datasetName => {
    console.log(data);
    chart.data.datasets.find(dataset => dataset.label === datasetName).data.push(data[datasetName]);
  });

  chart.update();
};