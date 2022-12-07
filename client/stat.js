const baseURL = 'http://localhost:3737'
//Sets Bar Graph Values
async function setBarValues() {
    let body = { currentUserId: 1 }
    let thisYearsStats = []

    let jan =  axios.post(baseURL + "/janValues", body);
    let feb =  axios.post(baseURL + "/febValues", body);
    let mar =  axios.post(baseURL + "/marValues", body);
    let apr =  axios.post(baseURL + "/aprValues", body);
    let may =  axios.post(baseURL + "/mayValues", body);
    let jun =  axios.post(baseURL + "/junValues", body);
    let jul =  axios.post(baseURL + "/julValues", body);
    let aug =  axios.post(baseURL + "/augValues", body);
    let sept =  axios.post(baseURL + "/septValues", body);
    let oct =  axios.post(baseURL + "/octValues", body);
    let nov =  axios.post(baseURL + "/novValues", body);
    let dec =  axios.post(baseURL + "/decValues", body);

    const monthRes = await Promise.all([jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec])

    monthRes.forEach(res => thisYearsStats.push(res.data[0].sum));
    console.log({ thisYearsStats });
    //Bar Chart
    // setup
    const data = {
      labels: ["January","February","March","April","May","June","July","August","September","October","November","December",],
      datasets: [{
          label: "Year Review",
          data: thisYearsStats,
          backgroundColor: [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.45)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // config
    const config = {
      type: "bar",
      data,
      options: {
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // render init block
    const myChart = new Chart(document.getElementById("myChart"), config);

}

function setDonutValues() {
    let thisMonthUnpaidCommitments = 50
    let thisMonthPaidCommitments = 50
    let body = {currentUserId: 1}
    let totalMoney = 0

    axios.post(baseURL + "/getTotalValues", body)
    .then((res) => {
        //TODO res.data may be an array
        console.log(res.data)
        totalMoney = res.data[0].sum 
        axios.post(baseURL + "/getDoughnutValues", body)
        .then(({ data }) => {
            //TODO res.data may be an array
            thisMonthPaidCommitments = data[0].sum * 100 / totalMoney
            thisMonthUnpaidCommitments = 100 - thisMonthPaidCommitments 
            // Doughtnut Chart
    // setup
    console.log([thisMonthUnpaidCommitments, thisMonthPaidCommitments])
    const dataDoughnut = {
        labels: ['Current Month:'],
      datasets: [{
        label: ' % Paid',
        data:  [thisMonthUnpaidCommitments, thisMonthPaidCommitments],
        backgroundColor: [
          'rgba(2, 169, 27, 1)',
          'rgba(75, 75, 75, 0.2)'
        ],
        borderColor: [
          'rgba(2, 169, 27, 1)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderWidth: 1
          },
        ],
      };
  
      // config
      const configDoughnut = {
        type: "doughnut",
        data: dataDoughnut,
        options: {
          circumference: 180,
        rotation: 270,
        cutout: "80%",
        aspectRatio: 1,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0
            }
          }
        }
        },
      };
  
      // render init block
      const myChartDoughnut = new Chart(
        document.getElementById("myChartDoughnut"),
        configDoughnut
      );
    })
    .catch(err => console.log(err))

    })
}

setBarValues()
setDonutValues()