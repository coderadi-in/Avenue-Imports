// ? GETTING DOC ELEMENTS
const openTradeInBtn = document.getElementById("tradeInOpen");
const transformer = document.querySelector(".transformer");
const tradeInForm = document.querySelector(".form");
const closeWizardBtns = document.querySelectorAll('.close-tradeIn-btn');

// & EVENT LISTENER TO CLOSE FORM
closeWizardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        transformer.classList.remove("expand-fullscreen");

        setTimeout(() => {
            transformer.style.display = "none";
        }, 600);
    })
})

// & EVENT LISTENER TO OPEN FROM
openTradeInBtn.addEventListener('click', () => {
    transformer.style.display = "block";

    setTimeout(() => {
        transformer.classList.add("expand-fullscreen");
    }, 100);
})