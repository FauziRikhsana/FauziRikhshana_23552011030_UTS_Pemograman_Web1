const API_BASE = '../backend'; 


function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}


async function fetchInfos() {
  try {
    const res = await fetch(API_BASE + '/data.json'); 
    if (!res.ok) throw new Error('Gagal fetch data');
    const json = await res.json();
    return json.infos;
  } catch (err) {
    
   return [
  {
    id: 1,
    title: 'Visi Misi Perusahaan',
    summary: 'Visi & misi perusahaan...',
    body: 'Isi lengkap visi, misi dan nilai-nilai ...',
    img: './assets/JS/img/logo_perusahaan.png'
  },
  {
    id: 2,
    title: 'Produk Unggulan',
    summary: 'Produk unggulan kami...',
    body: 'Detail produk unggulan ...',
    img: './assets/JS/img/produk.png'
  },
  {
    id: 3,
    title: 'Program CSR',
    summary: 'Kegiatan CSR',
    body: 'Detail CSR ...',
    img: './assets/JS/img/program.png'
  }
];
  }
}

async function renderIndexCards() {
  const cards = document.getElementById('cards');
  if (!cards) return;
  const infos = await fetchInfos();
  cards.innerHTML = '';
  infos.forEach(info => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${info.img || 'assets/img/placeholder.png'}" class="card-img-top" style="height:180px; object-fit:cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${info.title}</h5>
          <p class="card-text">${info.summary}</p>
          <a href="detail.html?id=${info.id}" class="mt-auto btn btn-outline-primary">Detail</a>
        </div>
      </div>
    `;
    cards.appendChild(col);
  });
}

async function renderDetail() {
  const id = getQueryParam('id');
  if (!id) return;
  const infos = await fetchInfos();
  const info = infos.find(x => String(x.id) === String(id));
  if (!info) {
    document.getElementById('detail-card').innerHTML = '<div class="card-body"><p>Informasi tidak ditemukan.</p></div>';
    return;
  }
  document.getElementById('detail-img').src = info.img || 'assets/img/placeholder.png';
  document.getElementById('detail-title').textContent = info.title;
  document.getElementById('detail-body').textContent = info.body;
}


document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cards')) renderIndexCards();
  if (document.getElementById('detail-card')) renderDetail();
});
