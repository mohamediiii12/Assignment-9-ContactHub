
var persName = document.getElementById("name");
var persNumber = document.getElementById("phone");
var persEmail = document.getElementById("email");
var persAddress = document.getElementById("address");
var persGroup = document.getElementById("group");
var persImage = document.getElementById("image");
var favorite = document.getElementById("favorite");
var emergency = document.getElementById("emergency");
var favContacts = document.getElementById("fav-contacts");
var EmereContacts = document.getElementById("Emere-contacts");
var contactsCards = document.getElementById("contacts-cards");
var totalContacts = document.getElementById("total-contacts");
var favoriteContacts = document.getElementById("favorite-contacts");
var EmeregencyContacts = document.getElementById("Emeregency-contacts");
var saveContactBtn = document.getElementById("saveContactBtn");
var UpdateContactBtn = document.getElementById("UpdateContactBtn");
var formLabel = document.getElementById("staticBackdropLabel");
var searchInput = document.getElementById("search-input");
var contactsList = [];
if (localStorage.getItem("contactsList")) {
   contactsList = JSON.parse(localStorage.getItem("contactsList"));
   DisplayContacts(contactsList);
   displayFavorite(contactsList);
   displayEmergency(contactsList);

}
NoContacts(contactsList);
Nofav(contactsList);
Noemer(contactsList);
function addclick() {
   formLabel.innerHTML = "Add New Contact";
   UpdateContactBtn.classList.add("d-none");
   saveContactBtn.classList.remove("d-none");
}
function addContact() {
   if(inputacception()){
      return;
   }
   if (validationInputs(persName) && validationInputs(persNumber)) {
      // inputacception();
      var contact = {
         name: persName.value,
         number: persNumber.value,
         email: persEmail.value,
         address: persAddress.value,
         group: persGroup.value,
         image: persImage.files.length > 0
            ? `images/${persImage.files[0].name}`
            : "",
         emergency: emergency.checked,
         favorite: favorite.checked
      };

      contactsList.push(contact);
      localStorage.setItem("contactsList", JSON.stringify(contactsList));
      DisplayContacts(contactsList);
      displayFavorite(contactsList);
      displayEmergency(contactsList);
      Nofav(contactsList);
      Noemer(contactsList);


      resetForm();
   }
}

function resetForm() {
   persName.value = "";
   persNumber.value = "";
   persEmail.value = "";
   persAddress.value = "";
   persGroup.value = "";
   persImage.value = "";
   favorite.checked = false;
   emergency.checked = false;
};
function DisplayContacts(list) {
   var cards = ``;
   totalContacts.innerHTML = `${list.length}`;

   contactsCards.classList.remove("no-contacts");
   for (var i = 0; i < list.length; i++) {
      var padgeGroup = changePadgeGroup(list[i].group);
      cards += `<div class="col-md-6">
                           <div class="card h-100">
                              <div class="card-body">
                                 <div class="d-flex flex-row column-gap-3 align-items-center mb-3">
                                 <div class="position-relative w-h-56">
                                 ${list[i].image ? `<img src="${list[i].image}" class="img-fluid object-fit-cover rounded-3">` : `<div class="person-img  w-100 h-100">
                                       <span id="person-img-text"
                                          class="text-white fw-bolder text-lg d-flex justify-content-center align-items-center">AF</span>     
                                    </div>`}
                                    
                                    ${list[i].favorite ? `<span class="fav-icon w-h-20 bg-amber-400 d-flex justify-content-center align-items-center text-white rounded-circle text-xxxs"><i class="fas fa-star"></i></span>` : ``}
                                    ${list[i].emergency ? `<span class="emer-icon w-h-20 bg-rose-500 d-flex justify-content-center align-items-center text-white rounded-circle text-xxxs"><i class="fas fa-heart-pulse"></i></span>` : ``}
                                    </div>
                                    <div>
                                       <h3 id="persName" class="fw-bold text-gray-900 h6">${list[i].name}</h3>
                                       <div class="d-flex column-gap-2 align-items-center">
                                          <span
                                             class="w-h-24 bg-blue-100 text-blue-600 text-xxs rounded-2 d-flex justify-content-center align-items-center"><i
                                                class="fas fa-phone"></i></span>
                                          <p class="text-gray-500 text-sm" id="persNumber">${list[i].number}</p>
                                       </div>
                                    </div>
                                 </div>
                                 ${list[i].email ? `<div class=" d-flex column-gap-2 align-items-center mb-3">
                                    <span
                                       class="w-h-24 bg-violet-100 text-violet-600 text-xxs rounded-2 d-flex justify-content-center align-items-center"><i
                                          class="fas fa-envelope"></i></span>
                                    <p class="text-gray-500 text-sm" id="persEmail">${list[i].email}</p>
                                 </div>` : ``}
                                 ${list[i].address ? `<div class=" d-flex column-gap-2 align-items-center mb-3">
                                    <span
                                       class="w-h-24 bg-emerald-100 text-emerald-600 text-xxs rounded-2 d-flex justify-content-center align-items-center"><i
                                          class="fas fa-location-dot"></i></span>
                                    <p class="text-gray-500 text-sm" id="persAddress">${list[i].address}</p>
                                 </div>` : ``}
                                 
                                 <div class="d-flex flex-row flex-wrap align-items-center">
                                    <div>
                                       <span
                                          class="${padgeGroup} py-1 px-2 rounded-2 text-xs fw-semibold me-2">${list[i].group}
                                       </span>
                                    </div>
                                    ${list[i].emergency ? `<span
                                          class=" bg-rose-50 text-rose-600 py-1 px-2 rounded-2 text-xxs fw-semibold"><i class="fas fa-heart-pulse"></i> Emergency
                                    </span>` : ``}
                                    
                                 </div>
                              </div>
                              <div class="card-footer">
                                 <div class="d-flex flex-row flex-wrap justify-content-between">
                                    <div class="d-flex column-gap-2">
                                       <a class="call w-h-36 bg-emerald-50 text-emerald-600 text-sm rounded-3 d-flex justify-content-center align-items-center"
                                          title="Call">
                                          <i class="fas fa-phone"></i>
                                       </a>
                                       <a class="Email w-h-36 bg-violet-50 text-violet-600 text-sm rounded-3 d-flex justify-content-center align-items-center"
                                          title="Email">
                                          <i class="fas fa-envelope"></i>
                                       </a>
                                    </div>
                                    <div class="d-flex column-gap-1">
                                    ${list[i].favorite ? `<button  onclick="favBtnToggle(${list[i].number})"
                                          class=" favorite-btn-active border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-400"
                                          title="Favorite">
                                          <i class="fas fa-star"></i>
                                       </button>`: `<button  onclick="favBtnToggle(${list[i].number})"
                                          class=" favorite-btn border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-400"
                                          title="Favorite">
                                          <i class="far fa-star"></i>
                                       </button>`}
                                       ${list[i].emergency ? `<button  onclick="EmereBtnToggle(${list[i].number})"
                                          class="emergency-btn-active border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-400"
                                          title="Emergency">
                                          <i class="fas fa-heart-pulse"></i>
                                       </button>`: `<button  onclick="EmereBtnToggle(${list[i].number})"
                                          class="emergency-btn border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-400"
                                          title="Emergency">
                                          <i class="far fa-heart"></i>
                                       </button>`}   
                                       
                                       <button id="edit-btn" onclick="editContact(${list[i].number})" data-bs-toggle="modal" data-bs-target="#addContactModal"
                                          class="edit-btn border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-500"
                                          title="Edit">
                                          <i class="fas fa-pen"></i>
                                       </button>
                                       <button id="delete-btn" onclick="DeleteContact(${list[i].number})"
                                          class=" delete-btn border-0  w-h-36 text-sm rounded-3 d-flex justify-content-center align-items-center text-gray-500"
                                          title="Delete">
                                          <i class="fas fa-trash"></i>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>`
   };
   contactsCards.innerHTML = cards;

};
function changePadgeGroup(value) {
   var padgeGroup = "";
   if (value == "family") {
      padgeGroup = "bg-blue-100 text-blue-700";
   } else if (value == "Friends") {
      padgeGroup = "bg-green-100 text-green-700";
   } else if (value == "Work") {
      padgeGroup = "bg-purple-100 text-purple-700";
   } else if (value == "School") {
      padgeGroup = "bg-amber-100 text-amber-700";
   } else if (value == "Other") {
      padgeGroup = "bg-gray-100 text-gray-700";
   } else {
      padgeGroup = "d-none";
   }
   return padgeGroup
};
function displayFavorite(list) {
   favoriteList = [];
   var cards = "";
   favContacts.classList.remove("no-fav-emer");
   for (var i = 0; i < list.length; i++) {
      if (list[i].favorite) {
         cards += `<div class="col-md-6 col-xxl-12">
                                    <a class="call-fav d-flex flex-row justify-content-between align-items-center p-2">
                                       <div class="d-flex flex-row column-gap-1 align-items-center">
                                          <div class="person-img w-h-40 rounded-3">
                                             <span id="person-img-text"
                                                class="text-white fw-bolder text-sm d-flex justify-content-center align-items-center">M</span>
                                          </div>
                                          <div>
                                             <h4 id="persName" class="fw-bold text-gray-900 text-xxs m-0">${list[i].name}
                                             </h4>
                                             <p class="text-gray-500 text-xxs" id="persNumber">${list[i].number}</p>
                                          </div>
                                       </div>
                                       <span
                                          class="w-h-24 bg-emerald-100 text-emerald-600 text-xxs rounded-2 d-flex justify-content-center align-items-center"><i
                                             class="fas fa-phone"></i></span>
                                    </a>
                                 </div>`;
         favoriteList.push(list[i]);
      };
   };
   favContacts.innerHTML = cards;
   favoriteContacts.innerHTML = favoriteList.length;
};
function displayEmergency(list) {
   emergencyList = [];
   var cards = ``;
   EmereContacts.classList.remove("no-fav-emer");
   for (var i = 0; i < list.length; i++) {
      if (list[i].emergency) {
         cards += ` <div class="col-md-6 col-xxl-12">
                                    <a class="call-Emer d-flex flex-row justify-content-between align-items-center p-2">
                                       <div class="d-flex flex-row column-gap-1 align-items-center">
                                          <div class="person-img w-h-40 rounded-3">
                                             <span id="person-img-text"
                                                class="text-white fw-bolder text-sm d-flex justify-content-center align-items-center">M</span>
                                          </div>
                                          <div>
                                             <h4 id="persName" class="fw-bold text-gray-900 text-xxs m-0">${list[i].name}
                                             </h4>
                                             <p class="text-gray-500 text-xxs" id="persNumber">${list[i].number}</p>
                                          </div>
                                       </div>
                                       <span
                                          class="w-h-24 bg-rose-100 text-rose-600 text-xxs rounded-2 d-flex justify-content-center align-items-center"><i
                                             class="fas fa-phone"></i></span>
                                    </a>
                                 </div>`;
         emergencyList.push(list[i]);
      };
   };
   EmereContacts.innerHTML = cards;
   EmeregencyContacts.innerHTML = emergencyList.length;
};
function favBtnToggle(num) {
   var index;
   for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].number == num) {
         index = i;
      }
   };
   contactsList[index].favorite = !contactsList[index].favorite;
   localStorage.setItem("contactsList", JSON.stringify(contactsList));
   DisplayContacts(contactsList);
   displayFavorite(contactsList);
   Nofav(contactsList);
}
function EmereBtnToggle(num) {
   var index;
   for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].number == num) {
         index = i;
      }
   }
   contactsList[index].emergency = !contactsList[index].emergency;
   localStorage.setItem("contactsList", JSON.stringify(contactsList));
   DisplayContacts(contactsList);
   displayEmergency(contactsList);
   Noemer(contactsList);
}
function DeleteContact(num) {
   var index;
   for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].number == num) {
         index = i;
      }
   }
   contactsList.splice(index, 1);
   localStorage.setItem("contactsList", JSON.stringify(contactsList));
   DisplayContacts(contactsList);
   displayFavorite(contactsList);
   displayEmergency(contactsList);
   NoContacts(contactsList);
   Nofav(contactsList);
   Noemer(contactsList);
}
function NoContacts(list) {
   if (list.length == 0) {
      contactsCards.classList.add("no-contacts");
      contactsCards.innerHTML = `<div>
      <span class="mx-auto mb-2 w-h-80 fs-1 rounded-4 bg-gray-100 text-gray-300 d-flex justify-content-center align-items-center">
      <i class="fas fa-address-book"></i>
      </span>
      <p class="text-gray-500 fw-medium mb-2">No contacts found</p>
      <p class="text-gray-400 text-sm fw-medium mb-2">Click "Add Contact" to get started</p>
      </div>`;
   };
};
function Nofav(list) {
   var favList = [];
   for (var i = 0; i < list.length; i++) {
      if (list[i].favorite) {
         favList.push(list[i]);
      }
   }
   if (favList.length == 0) {
      favContacts.classList.add("no-fav-emer");
      favContacts.innerHTML = `<p class="text-gray-400 fw-medium">No favorites yet</p>`;
   };

};
function Noemer(list) {
   var emerList = [];
   for (var i = 0; i < list.length; i++) {
      if (list[i].emergency) {
         emerList.push(list[i]);
      }
   }
   if (emerList.length == 0) {
      EmereContacts.classList.add("no-fav-emer");
      EmereContacts.innerHTML = `<p class="text-gray-400 fw-medium">No emergencies yet</p>`;
   };
};
var editIndex;
function editContact(num) {
   var index;
   for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].number == num) {
         index = i;
         editIndex = i;
      }
   }
   persName.value = contactsList[index].name;
   persNumber.value = contactsList[index].number;
   persEmail.value = contactsList[index].email;
   persAddress.value = contactsList[index].address;
   persGroup.value = contactsList[index].group;

   favorite.checked = contactsList[index].favorite;
   emergency.checked = contactsList[index].emergency;
   formLabel.innerHTML = "Update Contact";
   UpdateContactBtn.classList.remove("d-none");
   saveContactBtn.classList.add("d-none");
};
function UpdateContact() {
   if (validationInputs(persName) && validationInputs(persNumber)) {
      contactsList[editIndex].name = persName.value;
      contactsList[editIndex].number = persNumber.value;
      contactsList[editIndex].email = persEmail.value;
      contactsList[editIndex].address = persAddress.value;
      contactsList[editIndex].group = persGroup.value;
      if (persImage.files.length > 0) {
         contactsList[editIndex].image = `images/${persImage.files[0].name}`;}
      contactsList[editIndex].favorite = favorite.checked;
      contactsList[editIndex].emergency = emergency.checked;
      localStorage.setItem("contactsList", JSON.stringify(contactsList));
      DisplayContacts(contactsList);
      displayFavorite(contactsList);
      displayEmergency(contactsList);
      NoContacts(contactsList);
      Nofav(contactsList);
      Noemer(contactsList);
      bootstrap.Modal.getInstance(
         document.getElementById("addContactModal")
      ).hide();

   };
};
function searchContact() {
   var searchList = [];
   for (var i = 0; i < contactsList.length; i++) {
      if (contactsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) || contactsList[i].number.toString().includes(searchInput.value) || contactsList[i].email.toLowerCase().includes(searchInput.value.toLowerCase())) {
         searchList.push(contactsList[i]);
      }
   }
   DisplayContacts(searchList);
   displayFavorite(searchList);
   displayEmergency(searchList);
   NoContacts(searchList);
   Nofav(searchList);
   Noemer(searchList);
}
function inputacception() {
   if (persName.value == "" && persNumber.value == "") {
      Swal.fire({
         title: "Name and Number are required",
         text: "Please fill in the remaining fields.",
         icon: "error",
         padding: "1.5rem",
         draggable: true,
      });

   } else if (persName.value == "") {
      Swal.fire({
         title: "Missing Name",
         text: "Please enter a name for the contact!",
         icon: "error",
         padding: "1.5rem",
         draggable: true,
      });
   } else if (persNumber.value == "") {

      Swal.fire({
         title: "Missing Phone",
         text: "Please enter a phone number!",
         icon: "error",
         padding: "1.5rem",
         draggable: true,
      });

   } else {

      swal.fire({
         title: "Added",
         text: "Contact has been Added Successfully",
         icon: "success",
         padding: "1.5rem",
         showConfirmButton: false,
         timer: 2000,
      });

   }
}
function validationInputs(element) {
   var regex = {
      name: /^[a-zA-Z\s]+$/i,
      phone: /^(01)[0-2 5][0-9]{8}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
   }
   var isvalid = regex[element.id].test(element.value.toString());

   if (isvalid) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.replace("d-block", "d-none");
      saveContactBtn.setAttribute("data-bs-dismiss", "modal");

   } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.replace("d-none", "d-block");
      saveContactBtn.removeAttribute("data-bs-dismiss");

   };


   return isvalid;
};

