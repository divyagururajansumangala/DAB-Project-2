d3.json('/data', function(res) {
    console.log(res);
    // Start
    // Selecting the d3 elements
    let data_one = res;
    let form = d3.select("form");
    let button = d3.select("#filter-btn");

    button.on("click", filterdata);
    form.on("submit", filterdata);

    function filterdata() {
        // so that it doesnt refresh the page
        // Reading the input Data and filtering it
        d3.event.preventDefault();
        let inputData = d3.select("#datetime").property("value");
        inputData = +inputData;
        let filteredData = data_one.filter(ele => ele.year === inputData);

        // Rendering the first line graphs
        render_chart(filteredData);


    }



    function render_chart(data) {
        let date = data.map((ele) => ele.date);
        let fatalities = data.map((ele) => ele.fatalities);
        // Sorting the filterred data
        let max_filtered = data.sort(function(a, b) {
            return b.fatalities - a.fatalities;
        });

        let fatalities_rate = data.map((ele) => {
            return ele.fatalities_rate;
        });
        let sum = fatalities_rate.reduce((a, b) => {
            return a + b;
        }, 0);
        let avg = Math.round(sum / fatalities_rate.length).toFixed(1);
        // console.log(avg);
        ApexCharts.exec('line', 'updateOptions', {
            xaxis: {
                categories: date
            }
        }, false, true);
        ApexCharts.exec('line', 'updateSeries', [{
            data: fatalities
        }], true);

        chart_radial.updateOptions({
            series: [avg]
        })
        update_max_fatalities(max_filtered[0]);

        let top_ten = max_filtered.slice(0, 5);
        // console.log(top_ten);
        update_hbar_chart(top_ten);
        // To update the text within the html


    }


    function update_hbar_chart(data) {
        // console.log(data.map(elem => elem.operator));

        // options_hbar.updateOptions({
        //     xaxis: {
        //         categories: data.map(elem => elem.operator)
        //     }
        // })

        // ApexCharts.exec('hbar', 'updateSeries', {
        //     series: [{
        //         data: data.map(elem => elem.fatalities)
        //     }],
        // }, true);

        chart_hbar.updateOptions({
            series: [{
                data: data.map(elem => elem.fatalities)
            }],
            xaxis: {
                categories: data.map(elem => elem.operator)
            }
        })

    }

    function update_max_fatalities(max_fatalities) {

        const currentDate = new Date(max_fatalities.date)
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        d3.select("#max-fatalities").text(max_fatalities.fatalities)
        d3.select("#max-date").text(dateString)
        d3.select("#max-departure").text(max_fatalities.operator)
        d3.select("#max-location").text(max_fatalities.location)
    }

    data_filter = data_one.filter(ele => ele.year === 2019)

    // Initiliasing the index html page
    let date = data_filter.map((ele) => ele.date)
    let fatalities = data_filter.map((ele) => ele.fatalities)
    let fatalities_rate = data_filter.map((ele) => ele.fatalities_rate)
    let fatalities_passengers = data_filter.map((ele) => ele.fatalities_passengers)
    let fatalities_crew = data_filter.map((ele) => ele.fatalities_crew)
    fatalities_passengers = fatalities_passengers.sort((a, b) => a > b ? 1 : -1);
    fatalities_passengers = fatalities_passengers.slice(0, 5);
    fatalities_crew = fatalities_crew.sort((a, b) => a > b ? 1 : -1);
    fatalities_crew = fatalities_crew.slice(0, 5);

    let max_filtered_init = data_filter.sort(function(a, b) {
        return b.fatalities - a.fatalities;
    });

    let top_five = max_filtered_init.slice(0, 5);
    // First line Chart
    var options = {
        series: [{
            name: "Fatalities",
            data: fatalities
        }],
        chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: true
            },
            id: 'line',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },

        title: {
            text: 'Fatalities by Year',
            align: 'centre'
        },

        xaxis: {
            type: 'datetime',
            categories: date,
            labels: {
                format: 'MMM/yyyy',
            },
            tickAmount: 12,
            tickPlacement: 'between',
            tooltip: {
                enabled: false,
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: 'black',
                height: 3,


            },
        },
        stroke: {
            curve: 'smooth'
        },
        legend: {
            show: true
        },
        markers: {
            size: 5,
            colors: ["#000524"],
            strokeColor: "#00BAEC",
            strokeWidth: 3
        },
        tooltip: {
            theme: "dark"
        },



    };

    var chart = new ApexCharts(document.querySelector("#apex1"), options);
    chart.render();
    //   -----------------------------------------------------------------------------
    var options_radial = {
        series: [90],
        chart: {
            id: 'radial',
            height: 350,
            type: 'radialBar',
            offsetY: -10,
            toolbar: {
                show: false
            }

        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function(val) {
                            return val + "%";
                        }
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91]
            },
        },
        stroke: {
            dashArray: 4
        },
        labels: ['Fatalities Rate'],
    };

    var chart_radial = new ApexCharts(document.querySelector("#chart_radial"), options_radial);
    chart_radial.render();


    // HBar Cahrt------------------------------------------------

    var options_hbar = {
        series: [{
            name: "Fatalities",
            data: top_five.map(elem => elem.fatalities)
        }],
        chart: {
            id: "hbar",
            type: 'bar',
            toolbar: {
                show: false
            },
            height: 350,
            width: 300,
            foreColor: 'white'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        title: {
            text: 'Fatalities by Airlines',
            align: 'centre',

        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: top_five.map(elem => elem.operator),
        }
    };

    let chart_hbar = new ApexCharts(document.querySelector("#hbar_chart"), options_hbar);
    chart_hbar.render();

    // End

});