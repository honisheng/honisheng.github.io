import { auth, db , storage} from "./uploadphotojs/Firebase Config.js";
    import { 
      signInWithEmailAndPassword, signOut, onAuthStateChanged 
    } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
    import { 
      collection, query, where, orderBy, getDocs 
    } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

    // --- DOM 元素 ---
    const loginSection = document.getElementById("loginSection");
    const adminSection = document.getElementById("adminSection");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");

    const groupSelect = document.getElementById("groupSelect");
    const loadBtn = document.getElementById("loadBtn");
    const gallery = document.getElementById("gallery");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    // --- 登入功能 ---
    loginBtn.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        loginError.textContent = "";
      } catch (err) {
        loginError.textContent = "登入失敗：" + err.message;
      }
    });

    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
    });

    // --- 監聽登入狀態 ---
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loginSection.style.display = "none";
        adminSection.style.display = "block";
        loadGroups(); // 進後台時才載入群組
      } else {
        loginSection.style.display = "block";
        adminSection.style.display = "none";
      }
    });

    // --- 分頁邏輯 ---
    const PAGE_SIZE = 6;
    let photos = [];
    let currentPage = 1;

    async function loadGroups() {
      groupSelect.innerHTML = `<option value="">全部群組</option>`; // 清空再加
      const snapshot = await getDocs(collection(db, "uploads"));
      const groups = new Set();
      snapshot.forEach(doc => groups.add(doc.data().group_id));

      groups.forEach(g => {
        const option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        groupSelect.appendChild(option);
      });
    }

    async function loadPhotos(groupId = "") {
      gallery.innerHTML = "<p>載入中...</p>";
      let q;

      if (groupId) {
        q = query(collection(db, "uploads"), where("group_id", "==", groupId), orderBy("created_at", "desc"));
      } else {
        q = query(collection(db, "uploads"), orderBy("created_at", "desc"));
      }

      const snapshot = await getDocs(q);
      photos = [];
      snapshot.forEach(doc => photos.push(doc.data()));

      currentPage = 1;
      renderPage();
    }

    function renderPage() {
      gallery.innerHTML = "";
      if (photos.length === 0) {
        gallery.innerHTML = "<p>沒有找到任何照片</p>";
        pageInfo.textContent = "";
        return;
      }

      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageItems = photos.slice(start, end);

      pageItems.forEach((data) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="${data.photo_url}" width="200"><br>
          <p><b>群組：</b> ${data.group_id}</p>
          <p><b>留言：</b> ${data.comment || ""}</p>
          <hr>
        `;
        gallery.appendChild(div);
      });

      const totalPages = Math.ceil(photos.length / PAGE_SIZE);
      pageInfo.textContent = `第 ${currentPage} 頁 / 共 ${totalPages} 頁`;

      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = currentPage === totalPages;
    }

    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });

    nextPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(photos.length / PAGE_SIZE);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });

    loadBtn.addEventListener("click", () => {
      const groupId = groupSelect.value;
      loadPhotos(groupId);
    });
