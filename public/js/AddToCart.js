const addToCartForm = document.querySelector("#AddToCart-form");
const liveToast = document.querySelector("#liveToast");
const message = document.querySelector("#message");
const closeButton = document.querySelector("#close-button");
const userId = document.querySelector("#userId").innerText;

const redirectToHomePage = () => {
  window.location.replace("/");
};

const AddToCart = (formData, userId) => {
  console.log(userId);
  return fetch(`/api/user/addtocart/${userId}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

addToCartForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(addToCartForm);

  let formValue = {
    productName: "",
    address: "",
    otherDetails: "",
  };

  for (let index = 0; index < event.target.length; index++) {
    formValue[event.target[index].name] = formData.get(
      event.target[index].name
    );
  }

  if (
    formValue.productName === "" ||
    formValue.address === "" ||
    formValue.otherDetails === ""
  ) {
    liveToast.classList.remove("hide");
    liveToast.classList.add("show");
    message.innerText = "Please fill the form properly !";
    message.style.color = "#dc3545";
    setTimeout(() => {
      liveToast.classList.remove("show");
      liveToast.classList.add("hide");
    }, 3000);
  } else {
    const res = await AddToCart(formValue, userId);
    console.log(res);

    liveToast.classList.remove("hide");
    liveToast.classList.add("show");
    message.innerText = res.message;
    message.style.color = "#20c997";
    setTimeout(() => {
      liveToast.classList.remove("show");
      liveToast.classList.add("hide");
    }, 3000);
  }
});

closeButton.addEventListener("click", () => {
  liveToast.classList.add("hide");
  liveToast.classList.remove("show");
});
