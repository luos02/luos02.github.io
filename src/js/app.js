const states = {
  michoacan: { name: "Michoacán", tagline: "Cuna del dulce moreliano", sweets: ["Ate de guayaba", "Chongos zamoranos", "Dulce de leche quemada"] },
  baja: { name: "Baja California Sur", tagline: "Dulces del desierto y la costa", sweets: ["Dátiles rellenos", "Cocadas de la costa", "Dulce de higo"] },
  jalisco: { name: "Jalisco", tagline: "Tradición tapatía en cada dulce", sweets: ["Jamoncillo", "Borrachitos", "Dulce de tequila"] },
  quintanaroo: { name: "Quintana Roo", tagline: "Sabores del Caribe mexicano", sweets: ["Dulce de coco", "Miel melipona", "Jícama enchilada"] }
};

const tabs = [...document.querySelectorAll(".estado-tab")];
const panel = document.getElementById("estado-panel");
const nameElement = document.getElementById("estado-nombre");
const taglineElement = document.getElementById("estado-tagline");
const chipsElement = document.getElementById("estado-chips");

function renderState(key) {
  const state = states[key];
  if (!state) return;

  nameElement.textContent = state.name;
  taglineElement.textContent = state.tagline;
  panel.setAttribute("aria-labelledby", `tab-${key}`);
  chipsElement.replaceChildren(...state.sweets.map((sweet) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = sweet;
    return chip;
  }));

  tabs.forEach((tab) => {
    const active = tab.dataset.estado === key;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderState(tab.dataset.estado));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    renderState(tabs[nextIndex].dataset.estado);
  });
});

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("form-status").textContent = "Gracias. En este MVP el pedido aún no se envía; integraremos un servicio de correo o backend antes de publicarlo.";
});

renderState("michoacan");
