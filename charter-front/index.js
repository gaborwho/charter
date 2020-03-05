var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        },
        {        
            label: 'My Second dataset',
            backgroundColor: 'rgba(155, 99, 132, 0.9)',
            borderColor: 'rgb(155, 99, 132)',
            data: [10, 110, 25, 32, 420, 230, 445]
        }
        ]
    },
    options: {}
});
var i = 0;

setInterval(() => {
	console.log(chart.data.datasets[0].data);
	chart.data.labels.push("dataset " + i);
	i++;
	chart.data.datasets[0].data.push(Math.round(Math.random() * 100));
	chart.data.datasets[1].data.push(Math.round(Math.random() * 200));
	chart.update();
}, 1000);