document.addEventListener("DOMContentLoaded", start);
const form = document.querySelector("form");
let newPrice = 230;
let currentScreen;
let previousScreen;

function start() {
  document
    .querySelector("#hero_textbox a")
    .addEventListener("click", (event) => {
      document.querySelector("#popup").classList.remove("hidden");
      event.preventDefault();

      document.querySelector("#close").addEventListener("click", () => {
        document.querySelector("#popup").classList.add("hidden");
      });
    });
  document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.add("hidden");
      btn.parentElement.nextElementSibling.classList.remove("hidden");

      calculateCurrentScreen(btn.parentElement);

      calculatePreviousScreen(btn.parentElement);

      processBar(btn.parentElement);
    });
  });

  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      let parent = dot.parentElement.parentElement.parentElement.parentElement;

      if (
        dot.classList.contains("first") &&
        !parent.classList.contains("hidden")
      ) {
        document.querySelector("#screen_two").classList.toggle("hidden");
        parent.classList.toggle("hidden");
      } else if (
        dot.classList.contains("second") &&
        !parent.classList.contains("hidden")
      ) {
        document.querySelector("#screen_three").classList.remove("hidden");
        parent.classList.add("hidden");
      } else if (
        dot.classList.contains("third") &&
        !parent.classList.contains("hidden")
      ) {
        document.querySelector("#screen_four").classList.remove("hidden");
        parent.classList.add("hidden");
      } else if (
        dot.classList.contains("fourth") &&
        !parent.classList.contains("hidden")
      ) {
        document.querySelector("#screen_five").classList.remove("hidden");
        parent.classList.add("hidden");
      }
    });
  });

  document.querySelectorAll(".expand").forEach((icon) => {
    icon.addEventListener("click", () => {
      document.querySelector("#covered_read_more").classList.toggle("hidden");
      document.querySelector("#read_more_icon").classList.toggle("hidden");
      document
        .querySelector("#screen_one .subheading b")
        .classList.toggle("hidden");
    });
  });

  document.querySelectorAll(".choose_read_more").forEach((more) => {
    more.addEventListener("click", () => {
      let extraInfo = more.parentElement.parentElement.nextElementSibling;

      more.innerHTML = "<b>Læs mere</b>";

      extraInfo.classList.toggle("hidden");
      if (!extraInfo.classList.contains("hidden")) {
        more.innerHTML = "<b>Læs mindre</b>";
      }
    });
  });

  addUser();

  document
    .querySelector("#continue_button")
    .addEventListener("click", calculatePrice);

  document.querySelectorAll("#screen_two .checkbox").forEach((extra) => {
    extra.addEventListener("click", () => {
      showInsurances(extra);
    });
  });
}

function addUser() {
  document.querySelectorAll('input[type="number"]').forEach((btn) => {
    btn.oninput = function () {
      if (this == document.querySelector("#cpr_birthday")) {
        if (this.value.length > 6) {
          this.value = this.value.slice(0, 6);
        }
      } else if (this == document.querySelector("#phone")) {
        if (this.value.length > 8) {
          this.value = this.value.slice(0, 8);
        }
      } else {
        if (this.value.length > 4) {
          this.value = this.value.slice(0, 4);
        }
      }
    };
  });

  document
    .querySelector("#continue_button")
    .addEventListener("submit", (evt) => {
      post();
      evt.preventDefault();
    });
}

function post() {
  const data = {
    fname: form.elements.fname.value,
    lname: form.elements.lname.value,
    birthday: form.elements.cpr_birthday.value,
    personal: form.elements.cpr_personal.value,
    address: form.elements.address.value,
    post: form.elements.post.value,
    city: form.elements.city.value,
    email: form.elements.email.value,
    phone: form.elements.phone.value,
    data: form.elements.data.value,
  };

  const postData = JSON.stringify(data);
  fetch("https://almbrand-1893.restdb.io/rest/kunder", {
    method: "post",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-apikey": "5ec6e2705d18da1086cb1769",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function calculatePrice() {
  if (!document.querySelector(".damage").checked) {
    newPrice = newPrice - 99;
  }
  if (document.querySelector('.checkbox[value="travel"]').checked) {
    newPrice = newPrice + 69;
  }
  if (document.querySelector('.checkbox[value="electronic"]').checked) {
    newPrice = newPrice + 49;
  }
  if (document.querySelector('.checkbox[value="accident"]').checked) {
    newPrice = newPrice + 89;
  }

  document.querySelector("#your_price").textContent = `${newPrice} kr.`;
}

function showInsurances(chosen) {
  document.querySelectorAll(`.${chosen.value}_insurance`).forEach((icons) => {
    icons.classList.toggle("hidden");
  });
  document.querySelector(`#${chosen.value}_covers`).classList.toggle("hidden");

  if (
    (chosen.checked &&
      document.querySelector('.checkbox[value="travel"]').checked) ||
    document.querySelector('.checkbox[value="electronic"]').checked ||
    document.querySelector('.checkbox[value="accident"]').checked
  ) {
    document.querySelector("#chosen_covers").lastElementChild.style.maxWidth =
      "505px";
    document.querySelector("#chosen_covers").lastElementChild.style.margin =
      "20px 0px";
  }
}

function calculateCurrentScreen(screen1) {
  if (screen1.id == "screen_one") {
    currentScreen = document.querySelectorAll(".first");
  } else if (screen1.id == "screen_two") {
    currentScreen = document.querySelectorAll(".second");
  } else if (screen1.id == "screen_three") {
    currentScreen = document.querySelectorAll(".third");
  } else if (screen1.id == "screen_four") {
    currentScreen = document.querySelectorAll(".fourth");
  }
}

function calculatePreviousScreen(screen2) {
  if (screen2.id !== "screen_one") {
    if (screen2.previousElementSibling.id == "screen_one") {
      previousScreen = document.querySelectorAll(".first");
    } else if (screen2.previousElementSibling.id == "screen_two") {
      previousScreen = document.querySelectorAll(".second");
    } else if (screen2.previousElementSibling.id == "screen_three") {
      previousScreen = document.querySelectorAll(".third");
    } else if (screen2.previousElementSibling.id == "screen_four") {
      previousScreen = document.querySelectorAll(".fourth");
    }
  }
}

function processBar(screen) {
  if (screen.id !== "screen_one") {
    previousScreen.forEach((dot) => {
      dot.classList.toggle("done");
      dot.classList.toggle("doing");
    });
  }

  if (screen.classList.contains("hidden")) {
    currentScreen.forEach((dot) => {
      dot.classList.toggle("doing");
    });
  }
}
