let form = document.getElementById("form");
form.addEventListener("submit", sendData);
function sendData(e) {
  e.preventDefault();
  let regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (e.target[0].value.length == 0) {
    popup("Oops Can't Send Data", "You must write your email");
  } else if (
    e.target[0].value.length > 0 &&
    !regExEmail.test(e.target[0].value)
  ) {
    popup("Oops Can't Send Data", "You Have Entered An Invalid Email Address!");
  } else {
    let data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    let length = e.target.length - 1;
    for (let i = 0; i <= length; i++) {
      e.target[i].value = "";
    }

    axios
      .post("/api/login_dash", data)
      .then((res) => {
        if (res.data.status == 200) {
          window.location.replace("/dashboard/create");
        } else {
          popup(
            "There is an error information",
            "The email or password is incorrect"
          );
        }
      })
      .catch((err) => console.error(err));
    return data;
  }
}
let inputs = document.querySelectorAll(".form input");

inputs.forEach((input) => {
  input.addEventListener("change", (e) => changeLabel(e, input));
});

function changeLabel(e, ele) {
  if (e.target.value.length == 0) ele.classList.remove("open");
  else ele.classList.add("open");
}
function popup(msg, paragraph) {
  let popup = document.createElement("div");
  popup.className = "popup";
  document.getElementById("popupContainer").prepend(popup);

  let heading = document.createElement("h2");
  heading.innerHTML = msg;
  popup.append(heading);

  let para = document.createElement("p");
  para.innerHTML = paragraph;
  popup.append(para);

  let button = document.createElement("button");
  button.innerHTML = "Close";
  popup.append(button);
  button.addEventListener("click", () => popup.remove());
}
