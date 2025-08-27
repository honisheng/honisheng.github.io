// js/upload.js
import { db, storage } from "./Firebase Config.js";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// 從 URL 取得 groupId
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("group");

const form = document.getElementById("uploadForm");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.getElementById("photo").files[0];
  const comment = document.getElementById("comment").value;

  if (!file) return alert("請選擇照片");

  // 上傳 Storage
  const storageRef = ref(storage, `uploads/${groupId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  // Firestore 紀錄
  await addDoc(collection(db, "uploads"), {
    group_id: groupId,
    photo_url: url,
    comment: comment,
    created_at: serverTimestamp()
  });

  alert("上傳成功！");
  form.reset();
  loadPhotos();
});

// 載入群組照片
async function loadPhotos() {
  gallery.innerHTML = "";
  const q = query(collection(db, "uploads"), where("group_id", "==", groupId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${data.photo_url}" width="200"><br>
      <p>${data.comment || ""}</p>
    `;
    gallery.appendChild(div);
  });
}

loadPhotos();

