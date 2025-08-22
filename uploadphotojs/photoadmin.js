// js/admin.js
import { db } from "./uploadphotojs\Firebase Config.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const gallery = document.getElementById("gallery");
const filterBtn = document.getElementById("filterBtn");

async function loadPhotos(groupId = "") {
  gallery.innerHTML = "<p>載入中...</p>";
  let q;

  if (groupId) {
    q = query(collection(db, "uploads"), where("group_id", "==", groupId), orderBy("created_at", "desc"));
  } else {
    q = query(collection(db, "uploads"), orderBy("created_at", "desc"));
  }

  const snapshot = await getDocs(q);
  gallery.innerHTML = "";

  if (snapshot.empty) {
    gallery.innerHTML = "<p>沒有找到任何照片</p>";
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${data.photo_url}" width="200"><br>
      <p><b>群組：</b> ${data.group_id}</p>
      <p><b>留言：</b> ${data.comment || ""}</p>
    `;
    gallery.appendChild(div);
  });
}

// 預設載入所有照片
loadPhotos();

filterBtn.addEventListener("click", () => {
  const groupId = document.getElementById("filter").value.trim();
  loadPhotos(groupId);
});
