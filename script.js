document.querySelector("#cpr_birthday").oninput = function () {
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }
};
document.querySelector("#cpr_personal").oninput = function () {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};
document.querySelector("#post").oninput = function () {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};
