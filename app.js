const tglInput = document.getElementById("tglInput");
const jamInput = document.getElementById("jamInput");
const pilihan = document.getElementById("pilihan");

const tambah = () => {
  const tgl = tglInput.value;
  const jam = jamInput.value;
  const pil = pilihan.value;

  const data = document.createElement("div");

  data.innerHTML = `
  
  <p class="mt-3">${pil}</p>
    <ul class="list-group mt-3 ">
        <li class="list-group-item card-box"> ${tgl} <br> ${jam}</li>
    </ul>
    <button type="button" class="btn btn-danger btn-sm mt-2" >Hapus</button>
  
  
  `;

  var datas = document.querySelector(".list");

  datas.appendChild(data);

  // Save data to local storage
  let scheduleArray;
  if (localStorage.getItem("scheduleArray")) {
    scheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
  } else {
    scheduleArray = [];
  }

  scheduleArray.push({
    tgl: tgl,
    jam: jam,
    pil: pil,
  });

  localStorage.setItem("scheduleArray", JSON.stringify(scheduleArray));
  window.location.reload();
};

function removeSchedule(index) {
  let scheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
  scheduleArray.splice(index, 1);
  localStorage.setItem("scheduleArray", JSON.stringify(scheduleArray));
  location.reload();
}

// Load data from local storage on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("scheduleArray")) {
    const scheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
    scheduleArray.forEach((schedule, index) => {
      const data = document.createElement("div");
      data.innerHTML = `<p class="mt-3">${schedule.pil}</p > <ul class="list-group mt-3"> <li class="list-group-item card-box">${schedule.tgl} <br> ${schedule.jam}</li> </ul> <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeSchedule(${index})">Hapus</button>`;
      var datas = document.querySelector(".list");
      datas.appendChild(data);
    });
  }
});

const filterTanggal = () => {
  const tglFilter = document.getElementById("tglFilter").value;
  let scheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
  const filteredSchedules = scheduleArray.filter((schedule) => schedule.tgl === tglFilter);

  // Remove existing schedule elements
  const existingSchedules = document.querySelectorAll(".list div");
  existingSchedules.forEach((element) => element.remove());

  filteredSchedules.forEach((schedule, index) => {
    const data = document.createElement("div");
    data.innerHTML = `<p class="mt-3">${schedule.pil}</p > <ul class="list-group mt-3"> <li class="list-group-item card-box">${schedule.tgl} <br> ${schedule.jam}</li> </ul> <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeSchedule(${index})">Hapus</button>`;
    var datas = document.querySelector(".list");
    datas.appendChild(data);
  });
};

const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
  toastTrigger.addEventListener("click", () => {
    const toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  });
}
