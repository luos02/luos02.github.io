const data = {
  michoacan: {
    nombre: "Michoacán",
    tagline: "Cuna del dulce moreliano",
    dulces: [
      {
        nombre: "Ate de guayaba",
        descripcion: "Barra tradicional de pulpa de guayaba, disponible en presentación grande, mediana y mini.",
        imagen: "src/images/Michoacán/AteDeGuayaba.jpg"
      },
      {
        nombre: "Chongos zamoranos",
        descripcion: "Dulce de leche cuajada típico de Zamora, con un toque de canela.",
        imagen: "src/images/Michoacán/ChongosZamoranos.jpg"
      }
    ]
  },
  baja: {
    nombre: "Baja California Sur",
    tagline: "Dulces del desierto y la costa",
    dulces: [
      {
        nombre: "Saladito",
        descripcion: "Ciruela deshidratada con sal, el clásico dulce-salado de la región.",
        imagen: "src/images/BCS/Saladitos.jpeg"
      },
      {
        nombre: "Paleta con saladito",
        descripcion: "Paleta clásica cubierta con saladito, el combo favorito de la costa.",
        imagen: "src/images/BCS/paleta-con-saladito.jpeg"
      }
    ]
  },
  jalisco: {
    nombre: "Jalisco",
    tagline: "Tradición tapatía en cada dulce",
    dulces: [
      {
        nombre: "Borrachitos",
        descripcion: "Dulces de leche envinados, presentados en estuche de 24 piezas.",
        imagen: "src/images/Jalisco/Borrachitos.jpg"
      },
      {
        nombre: "Jamoncillo",
        descripcion: "Rollo tradicional de dulce de leche, hecho a mano en Tonalá.",
        imagen: "src/images/Jalisco/Jamoncillo.jpg"
      }
    ]
  },
  quintanaroo: {
    nombre: "Quintana Roo",
    tagline: "Sabores del Caribe mexicano",
    dulces: [
      {
        nombre: "Miel melipona",
        descripcion: "Miel de abeja melipona producida por comunidades mayas en Cobá, Tulum.",
        imagen: "src/images/QuintanaRoo/MielMelipona.jpg"
      },
      {
        nombre: "Jícama enchilada",
        descripcion: "Jícama fresca preparada con chile y limón, lista para disfrutar.",
        imagen: "src/images/QuintanaRoo/JícamaEnchilada.jpg"
      },
      {
        nombre: "Dulce de coco",
        descripcion: "Dulce artesanal de coco rallado, con el sabor tropical del Caribe mexicano.",
        imagen: "src/images/QuintanaRoo/DulceDeCoco.jpg"
      }
    ]
  }
};

const tabs = document.querySelectorAll('.estado-tab');
const nombreEl = document.getElementById('estado-nombre');
const taglineEl = document.getElementById('estado-tagline');
const dulcesEl = document.getElementById('estado-dulces');
const panelEl = document.getElementById('estado-panel');

function render(key) {
  const d = data[key];
  if (!d) return;
  nombreEl.textContent = d.nombre;
  taglineEl.textContent = d.tagline;
  dulcesEl.innerHTML = d.dulces.map(item => `
    <div class="dulce-card">
      <img class="dulce-img" src="${item.imagen}" alt="${item.nombre}" loading="lazy">
      <h4 class="dulce-nombre">${item.nombre}</h4>
      <p class="dulce-desc">${item.descripcion}</p>
    </div>
  `).join('');
  const activeTab = document.querySelector(`.estado-tab[data-estado="${key}"]`);
  if (activeTab) panelEl.setAttribute('aria-labelledby', activeTab.id);
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.tabIndex = -1;
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    render(tab.dataset.estado);
  });
});

render('michoacan');

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
let hideStatusTimeout;
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(hideStatusTimeout);
    status.textContent = '¡Gracias! Tu pedido fue enviado. Pronto alguien se comunicará con usted.';
    status.classList.add('visible');
    form.reset();
    hideStatusTimeout = setTimeout(() => {
      status.classList.remove('visible');
    }, 6000);
  });
}