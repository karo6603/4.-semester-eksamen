document.addEventListener("DOMContentLoaded", start);

let basePrice = 230;
let newPrice = basePrice;

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

  form();
  calculatePrice();
}

function form() {
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
}

function calculatePrice() {
  document.querySelectorAll(".checkbox").forEach((extra) => {
    extra.onclick = function () {
      if (this.checked) {
        if (this.classList.contains("damage")) {
          newPrice = newPrice + 50;
        } else {
          newPrice = newPrice + 10;
          document
            .querySelectorAll(`.${this.value}_insurance`)
            .forEach((icons) => {
              icons.classList.toggle("hidden");
            });
          document
            .querySelector(`#${this.value}_covers`)
            .classList.toggle("hidden");
        }
      } else {
        if (this.classList.contains("damage")) {
          newPrice = newPrice - 50;
        } else {
          newPrice = newPrice - 10;
        }
      }
      document.querySelector("#your_price").textContent = `${newPrice} kr.`;
    };
  });
}
