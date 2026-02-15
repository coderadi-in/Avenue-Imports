// ? GETTING DOC ELEMENTS
const openNav = document.querySelector('.menu.open');
const closeNav = document.querySelector('.menu.close');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav li');

const loanAmount = document.getElementById('loanAmount');
const interestRate = document.getElementById('interestRate');
const tenure = document.getElementById('loanTenure');

// ? GETTING SECTION ELEMENTS
const heroSection = document.querySelector(".hero");
const featuredSection = document.querySelector(".featured");
const financeSection = document.querySelector(".finance");

// ! INTERSECTION OBSERVER VALUES
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

// ! INITIALIZING INTERSECTION OBSERVER
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// * FUNCTION TO CALCULATE FINANCE
function calculateFinance(
    loanAmount,
    interestRate,
    tenure
) {
    // PARSE VALUES
    let principal = parseFloat(loanAmount);
    let rate = parseFloat(interestRate);
    let time = parseFloat(tenure);

    // CALCULATE MONTHLY RATE
    let monthlyRate = rate / 12 / 100;

    // CALCULATE TOTAL MONTHS
    let months = time * 12

    // CALCULATE EMI
    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)

    // CALCULATE TOTAL PAYABLE AND INTEREST
    let totalPayable = emi * months;
    let totalInterest = totalPayable - principal;

    return {
        emi: emi,
        totalInterest: totalInterest,
        totalPayable: totalPayable
    };
}

// * FUNCTION TO CALCULATE INTEREST/PRINCIPAL RATIO FOR CHART
function getInterestPrincipalRatio(principalAmount, totalInterestAmount) {
    let principal = parseFloat(principalAmount);
    let interest = parseFloat(totalInterestAmount);
    let total = principal + interest;

    if (!Number.isFinite(principal) || !Number.isFinite(interest) || total <= 0) {
        return {
            interestRatio: 0,
            principalRatio: 0
        };
    }

    return {
        interestRatio: interest / total,
        principalRatio: principal / total
    };
}

// ! SETTING UP CURRENCY FORMATTER
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

// | ADDING TRANSITION DELAY TO NAV LINKS
navLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.1 + 0.3}s`;
});

// * FUNCTION TO CLOSE NAVBAR
function closeNavBar() {
    navLinks.forEach(navlink => {
        navlink.classList.remove('show');
    })

    setTimeout(() => {
        nav.classList.remove('show');
    }, 500);

    setTimeout(() => {
        nav.style.display = "none";
    }, 1000);
}

// & EVENT LISTENER TO OPEN NAV
openNav.addEventListener('click', () => {
    nav.style.display = "flex";

    setTimeout(() => {
        nav.classList.add('show');
        navLinks.forEach(navlink => {
            navlink.classList.add('show');
        })
    }, 100);
});

// & EVENT LISTENER TO CLOSE NAV
closeNav.addEventListener('click', () => {
    closeNavBar();
});

// & EVENT LISTENERS TO CLOSE NAV WHEN BODY IS CLICKED
document.body.addEventListener('click', (e) => {
    if (nav.classList.contains('show') && !e.target.closest('.nav') && !e.target.closest('.menu.open')) {
        closeNavBar();
    }
});

// & PREPARING OBSERVABLES LIST
const observables = [heroSection, featuredSection, financeSection];

// & OBSERVING OBSERVABLE SECTIONS
observables.forEach((elem) => {
    observer.observe(elem);
})

// * FUNCTION TO HANDLE FINANCE INPUT CHANGES
function handleInputChanges() {
    // GET VALUES
    let loanAmountValue = loanAmount.value;
    let interestRateValue = interestRate.value;
    let tenureValue = tenure.value;

    // CALCULATE EMI
    let finance = calculateFinance(loanAmountValue, interestRateValue, tenureValue);
    let ratio = getInterestPrincipalRatio(loanAmountValue, finance.totalInterest);
    let emiFormatted = formatter.format(finance.emi);
    let interestFormatted = formatter.format(finance.totalInterest);
    let amountFormatted = formatter.format(finance.totalPayable);

    // UPDATE OUTPUT
    let emiOutput = document.getElementById('emiOutput');
    emiOutput.textContent = emiFormatted;

    let totalInterest = document.getElementById('totalInterest');
    totalInterest.textContent = interestFormatted;

    let totalAmount = document.getElementById('totalAmount');
    totalAmount.textContent = amountFormatted;

    // UPDATE CHART DATA USING RATIO
    interestChart.data.datasets[0].data = [ratio.interestRatio, ratio.principalRatio];
    interestChart.update();
}

// & EVENT LISTENER FOR FINANCE INPUT CHANGES
let inputs = [loanAmount, interestRate, tenure];
inputs.forEach((elem) => {
    elem.addEventListener('input', handleInputChanges);
})

// ! SETTING UP INTEREST CHART
let chartArea = document.getElementById("amountChart");
let ctx = chartArea.getContext('2d');
const interestChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Interest Amount", "Principal Amount"],
        datasets: [{
            label: "Interest Chart",
            data: [0.06, 0.93],
            backgroundColor: ["#EFC88B", "#2E5EAA"],
            hoverOffset: 10,
            borderWidth: 0
        }]
    }
});
