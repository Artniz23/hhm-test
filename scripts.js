const formSubmit = document.getElementById("form-submit");
const cardContainer = document.querySelector(".card-container");

document.addEventListener("DOMContentLoaded", getMessageData);
function getMessageData() {
  fetch("ajax.php?get_data=true", {
    method: "GET",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject();
      }
      return response.json();
    })
    .then((message) => {
      const { data } = message;
      data.map(({ name, email, text }) => {
        cardContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="card">
            <header class="card__header">
              <span class="card__name">${name}</span>
            </header>
            <div class="card__body">
              <span class="card__email">${email}</span>
              <span class="card__message">${text}</span>
            </div>
          </div>
          `
        );
      });
    })
    .catch(() => console.log("Error"));
}

const checkValidation = (element) => {
  const errorElement = element.nextElementSibling;
  if (element.value === "") {
    errorElement.style = "display: block";
    errorElement.textContent = "Пожалуйста, введите данные";

    return false;
  }

  if (element.type === "email") {
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regEmail.test(element.value) == false) {
      errorElement.style = "display: block";
      errorElement.textContent = "Пожалуйста, введите корректный email";

      return false;
    }
  }

  errorElement.style = "display: none";
  errorElement.textContent = "";
  return element;
};

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = checkValidation(e.target.name);
  const email = checkValidation(e.target.email);
  const text = checkValidation(e.target.text);

  if (name && email && text) {
    const json_send =
      "form_data=" +
      JSON.stringify({
        name: name.value,
        email: email.value,
        text: text.value,
      });
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "ajax.php", true);
    xmlhttp.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const {
          data: { name, email, text },
        } = JSON.parse(xmlhttp.responseText);
        cardContainer.insertAdjacentHTML(
          "beforeend",
          `
            <div class="card">
              <header class="card__header">
                <span class="card__name">${name}</span>
              </header>
              <div class="card__body">
                <span class="card__email">${email}</span>
                <span class="card__message">${text}</span>
              </div>
            </div>
            `
        );
      }
    };
    xmlhttp.send(json_send);
  }
});
