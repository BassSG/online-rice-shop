const dishes = [
  {
    name: "ข้าวกะเพราหมูสับ",
    price: 55,
    note: "ผัดแห้ง หอมกะเพรา เลือกระดับเผ็ดได้",
    icon: "กพ",
  },
  {
    name: "ข้าวไก่กระเทียม",
    price: 55,
    note: "ไก่นุ่ม กระเทียมหอม กินง่ายทุกวัย",
    icon: "กท",
  },
  {
    name: "ข้าวหมูทอดกระเทียม",
    price: 65,
    note: "หมูทอดหอมกรอบ เสิร์ฟกับข้าวร้อน",
    icon: "มท",
  },
  {
    name: "ข้าวไข่เจียวหมูสับ",
    price: 45,
    note: "ไข่ฟูร้อน ๆ เมนูเร็ว อิ่มคุ้ม",
    icon: "ไข",
  },
  {
    name: "ข้าวผัดหมู",
    price: 55,
    note: "ข้าวผัดหอมกระทะ รสกลมกล่อม",
    icon: "ผด",
  },
  {
    name: "ข้าวคั่วพริกเกลือ",
    price: 65,
    note: "รสจัด หอมพริกกระเทียม เหมาะกับคนชอบเข้ม",
    icon: "พก",
  },
  {
    name: "ข้าวกะเพราไก่",
    price: 55,
    note: "เมนูขายง่าย ทำไว เพิ่มไข่ดาวยิ่งลงตัว",
    icon: "กก",
  },
  {
    name: "เซตข้าวพร้อมน้ำ",
    price: 75,
    note: "เลือกเมนูหลักพร้อมน้ำดื่ม เหมาะกับมื้อกลางวัน ขายบนแพลตฟอร์มไม่เกิน 89",
    icon: "ซต",
  },
];

const menuGrid = document.querySelector("#menuGrid");
const dishSelect = document.querySelector("#dishSelect");
const toppingSelect = document.querySelector("#toppingSelect");
const quantityInput = document.querySelector("#quantityInput");
const timeSelect = document.querySelector("#timeSelect");
const customerInput = document.querySelector("#customerInput");
const totalPrice = document.querySelector("#totalPrice");
const copyOrder = document.querySelector("#copyOrder");
const orderMessage = document.querySelector("#orderMessage");
const header = document.querySelector(".site-header");

function renderMenu() {
  menuGrid.innerHTML = dishes
    .map(
      (dish) => `
        <article class="menu-card">
          <span class="dish-icon" aria-hidden="true">${dish.icon}</span>
          <div>
            <h3>${dish.name}</h3>
            <p>${dish.note}</p>
          </div>
          <div class="price-row">
            <span>${dish.price} บาท</span>
            <small>ขายตรง เริ่มต้น</small>
          </div>
        </article>
      `,
    )
    .join("");

  dishSelect.innerHTML = dishes
    .map((dish, index) => `<option value="${index}">${dish.name} - ${dish.price} บาท</option>`)
    .join("");
}

function getOrderTotal() {
  const dish = dishes[Number(dishSelect.value) || 0];
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const topping = Number(toppingSelect.value) || 0;
  return (dish.price + topping) * quantity;
}

function getToppingLabel() {
  return toppingSelect.options[toppingSelect.selectedIndex].textContent;
}

function updateTotal() {
  totalPrice.textContent = `${getOrderTotal().toLocaleString("th-TH")} บาท`;
}

async function copyOrderText() {
  const dish = dishes[Number(dishSelect.value) || 0];
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const text = [
    "ขอสั่งอาหารครับ",
    `เมนู: ${dish.name}`,
    `จำนวน: ${quantity} กล่อง`,
    `ท็อปปิง: ${getToppingLabel()}`,
    `รอบรับอาหาร: ${timeSelect.value}`,
    `ยอดโดยประมาณ: ${getOrderTotal().toLocaleString("th-TH")} บาท`,
    `ข้อมูลลูกค้า: ${customerInput.value || "-"}`,
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    orderMessage.textContent = "คัดลอกข้อความออเดอร์แล้ว";
  } catch {
    orderMessage.textContent = text;
  }
}

function updateHeader() {
  header.dataset.elevated = String(window.scrollY > 32);
}

renderMenu();
updateTotal();
updateHeader();

[dishSelect, toppingSelect, quantityInput].forEach((field) => {
  field.addEventListener("input", updateTotal);
});

copyOrder.addEventListener("click", copyOrderText);
window.addEventListener("scroll", updateHeader, { passive: true });
