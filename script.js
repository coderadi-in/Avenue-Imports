// ? GETTING DOC ELEMENTS
const openNav = document.querySelector('.menu.open');
const closeNav = document.querySelector('.menu.close');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav li');

const loanAmount = document.getElementById('loanAmount');
const interestRate = document.getElementById('interestRate');
const tenure = document.getElementById('tenure');
const calculateBtn = document.getElementById('calculateBtn');

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

    return emi;
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

// & EVENTLISTENER FOR CALCULATE BUTTON CLICK
calculateBtn.addEventListener('click', () => {
    // GET VALUES
    let loanAmountValue = loanAmount.value;
    let interestRateValue = interestRate.value;
    let tenureValue = tenure.value;

    // CALCULATE EMI
    let emi = calculateFinance(loanAmountValue, interestRateValue, tenureValue);
    let emiFormatted = formatter.format(emi);

    // UPDATE OUTPUT
    let outputElem = document.getElementById('emiOutput');
    outputElem.textContent = emiFormatted;
})
