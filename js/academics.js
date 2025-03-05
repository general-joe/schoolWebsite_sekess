// Data for the charts
const years = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];
const eightAs = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const sevenAs = [13, 14, 15, 16, 17, 18, 19, 21, 20, 22];
const sixAs = [19, 20, 21, 22, 23, 24, 26, 25, 27, 28];

// Performance Trends Chart
const performanceChart = new Chart(
  document.getElementById("performanceChart"),
  {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "8As",
          data: eightAs,
          borderColor: "#0052cc",
          tension: 0.4,
          fill: false,
        },
        {
          label: "7As",
          data: sevenAs,
          borderColor: "#00a3bf",
          tension: 0.4,
          fill: false,
        },
        {
          label: "6As",
          data: sixAs,
          borderColor: "#0747a6",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Performance Trends Over Years",
        },
        legend: {
          position: "bottom",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentage of Students (%)",
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  }
);

// Grade Distribution Chart
const gradeDistributionChart = new Chart(
  document.getElementById("gradeDistributionChart"),
  {
    type: "bar",
    data: {
      labels: ["8As", "7As", "6As"],
      datasets: [
        {
          label: "2023 Grade Distribution",
          data: [15, 22, 28],
          backgroundColor: ["#0052cc", "#00a3bf", "#0747a6"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Current Year Grade Distribution",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentage of Students (%)",
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  }
);

// Year Comparison Chart
const yearComparisonChart = new Chart(
  document.getElementById("yearComparisonChart"),
  {
    type: "bar",
    data: {
      labels: years,
      datasets: [
        {
          label: "Total Distinctions",
          data: [38, 41, 44, 47, 50, 53, 57, 59, 61, 65],
          backgroundColor: "#0052cc",
          borderColor: "#0052cc",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Total Distinctions by Year",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentage of Students (%)",
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  }
);

// Add animation to stats numbers
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + "%";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const endValue = parseInt(statNumber.textContent);
        animateValue(statNumber, 0, endValue, 2000);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  observer.observe(card);
});
