
class UI {
  hidePreloader() {
    document.querySelector(".preloader").style.display="none";
  }

  showNav() {
    document.querySelector(".nav").classList.toggle("nav_show");
  }

  video_controls() {
    let btn = document.querySelector(".video_toggle-btn");
    if(!btn.classList.contains("videoBtnSlide")) {
      btn.classList.add("videoBtnSlide");
      document.querySelector(".video_item").pause();
    } else {
      btn.classList.remove("videoBtnSlide");
      document.querySelector(".video_item").play();
    }
  }

  checkEmpty(name, lastname, email) {
    if (name === '' || lastname === '' || email === '')
      return false;
    return true;
  }

  showFeedback(text, type) {
    let feedback = document.querySelector(".drink-form_feedback");
    feedback.classList.add(type);
    feedback.innerText = text;
    this.removeAlert(type);
  }

  removeAlert(type) {
    setTimeout( () => {
      document.querySelector(".drink-form_feedback").classList.remove(type);
    }, 3000)
  }

  addCustomer(customer) {
    const images = [0,1,2,3,4];
    let random = Math.floor(Math.random()*images.length);
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
      <img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail" />
      <h4 class="person_name">${customer.name}</h4>
      <h4 class="person_lastname">${customer.lastname}</h4>
    `;
    document.querySelector(".drink-card_list").appendChild(div);
    this.clearFields();
  }

  clearFields() {
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastname").value = "";
    document.querySelector(".input-email").value = "";
  }
}


eventListeners();

function eventListeners() {
  //window event listener
  const ui = new UI();
  window.addEventListener("load", () => {
    ui.hidePreloader();
  });

  //nav btn
  document.querySelector(".navBtn").addEventListener("click", () => {
    ui.showNav();
  });

  //control the video
  document.querySelector(".video_toggle").addEventListener("click", () => {
    ui.video_controls();
  });

  //submit the form
  document.querySelector(".drink-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector(".input-name").value;
    const lastname = document.querySelector(".input-lastname").value;
    const email = document.querySelector(".input-email").value;

    let value = ui.checkEmpty(name, lastname, email);
    if (value) {
      let customer = new Customer(name, lastname, email);
      ui.addCustomer(customer);
      ui.showFeedback("customer added to the list", "success");
    } else {
      ui.showFeedback("some form values empty", "error");
    }
  })
}


function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}

//display modal
const links = document.querySelectorAll(".work-item_icon");
links.forEach( link => {
  link.addEventListener("click", event => {
    ui.showModal(event);
  })
})
