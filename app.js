const tglInput = document.getElementById("tglInput");
const jamInput = document.getElementById("jamInput");
const pilihanFilter = document.getElementById("pilihanFilter");
const keterangan = document.getElementById("keterangan");

const tambah = () => {
  const tgl = tglInput.value;
  const jam = jamInput.value;
  const pil = pilihanFilter.value;
  const ket = keterangan.value;

  const data = document.createElement("div");

  data.innerHTML = `
  
  <p class="mt-3">${pil}</p>
    <ul class="list-group mt-3 ">
        <li class="list-group-item card-box"> ${tgl} <br> ${jam} <br> ${ket}</li>
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
    ket: ket,
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
      data.innerHTML = `<p class="mt-3">${schedule.pil}</p > <ul class="list-group mt-3"> <li class="list-group-item card-box">${schedule.tgl} <br> ${schedule.ket} <br> ${schedule.jam}</li> </ul> <button type="button" class="btn btn-danger btn-sm mt-2" onclick="removeSchedule(${index})">Hapus</button>`;
      var datas = document.querySelector(".list");
      datas.appendChild(data);
    });
  }
});

const filterTanggal = () => {
  const tgl = tglFilter.value;

  let filteredData = [];
  if (localStorage.getItem("scheduleArray")) {
    const scheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
    filteredData = scheduleArray.filter((schedule) => {
      return schedule.tgl.includes(tgl);
    });
  }

  const dataContainer = document.querySelector(".list");
  dataContainer.innerHTML = "";
  if (filteredData.length === 0) {
    dataContainer.innerHTML = `<button type="button" class="btn btn-warning btn-sm" onclick="kembali()">Kembali</button> <p class='text-center'>Sepertinya Kamu tidak masuk PKL...</p>`;
    return;
  }

  dataContainer.innerHTML = `
  <button type="button" class="btn btn-warning btn-sm" onclick="kembali()">Kembali</button> 
  
  
  `;

  filteredData.forEach((schedule, index) => {
    const data = document.createElement("div");
    data.innerHTML = `<p class="mt-3">${schedule.pil}</p > <ul class="list-group mt-3"> <li class="list-group-item card-box">${schedule.tgl} <br> ${schedule.ket} <br>  ${schedule.jam}</li> </ul> `;
    dataContainer.appendChild(data);
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

const kembali = () => {
  window.location.reload();
};

$(".sidebar ul li").on("click", function () {
  $(".sidebar ul li.active").removeClass("active");
  $(this).addClass("active");
});

$(".open-btn").on("click", function () {
  $(".sidebar").addClass("active");
});

$(".close-btn").on("click", function () {
  $(".sidebar").removeClass("active");
});
