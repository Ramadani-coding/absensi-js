// Slide Bar
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

// inputan
const tglInput = document.getElementById("tglInput");
const list = document.getElementById("list");
var keterangan = document.querySelector(".keterangan");
const body = document.body;

const tambah = () => {
  const tgl = tglInput.value;
  const ket = list.value;

  const data = document.createElement("div");

  data.innerHTML = `
  <table class="table">
  <tbody>
    <tr>
      <th scope="row">${tgl}</th>
      <th>${ket}</th>
      <th>
        <button type="button" class="btn btn-warning btn-sm aksi">Edit</button>
        <button type="button" class="btn btn-danger btn-sm aksi">Hapus</button>
      </th>
    </tr>
  </tbody>
</table>
  `;

  keterangan.appendChild(data);

  let kegiatan;
  if (localStorage.getItem("kegiatan")) {
    kegiatan = JSON.parse(localStorage.getItem("kegiatan"));
  } else {
    kegiatan = [];
  }

  kegiatan.push({
    tgl: tgl,
    ket: ket,
  });

  localStorage.setItem("kegiatan", JSON.stringify(kegiatan));
  window.location.reload();
};

window.addEventListener("load", () => {
  if (localStorage.getItem("kegiatan")) {
    const kegiatan = JSON.parse(localStorage.getItem("kegiatan"));
    kegiatan.forEach((schedule, index) => {
      const data = document.createElement("div");
      data.innerHTML = `<table class="table">
        <tbody>
          <tr>
            <th scope="row">${schedule.tgl}</th>
            <th>${schedule.ket}</th>
            <th>
              <button type="button" class="btn btn-warning btn-sm aksi" onclick="alert('Maap fitur edit blom tersedia...')">Edit</button>
              <button type="button" class="btn btn-danger btn-sm aksi" onclick="hapuslist(${index})" >Hapus</button>
            </th>
          </tr>
        </tbody>
      </table>`;
      var datas = document.querySelector(".list");
      datas.appendChild(data);
    });
  }
});

function hapuslist(index) {
  let kegiatan = JSON.parse(localStorage.getItem("kegiatan"));
  kegiatan.splice(index, 1);
  localStorage.setItem("kegiatan", JSON.stringify(kegiatan));
  location.reload();
}

const filterTanggal = () => {
  const tgl = tglFilter.value;

  let filteredData = [];
  if (localStorage.getItem("kegiatan")) {
    const kegiatan = JSON.parse(localStorage.getItem("kegiatan"));
    filteredData = kegiatan.filter((schedule) => {
      return schedule.tgl.includes(tgl);
    });
  }

  const dataContainer = document.querySelector(".list");
  dataContainer.innerHTML = "";
  if (filteredData.length === 0) {
    dataContainer.innerHTML = `<button type="button" class="btn btn-warning btn-sm" onclick="kembali()">Kembali</button> <p class='text-center'>Tidak ada kegiatan YGY...</p>`;
    return;
  }

  dataContainer.innerHTML = `
  <button type="button" class="btn btn-warning btn-sm" onclick="kembali()">Kembali</button> 
  
  
  `;

  filteredData.forEach((schedule, index) => {
    const data = document.createElement("div");
    data.innerHTML = `<table class="table">
    <tbody>
      <tr>
        <th scope="row">${schedule.tgl}</th>
        <th>${schedule.ket}</th>
      </tr>
    </tbody>
  </table>`;
    dataContainer.appendChild(data);
  });
};
