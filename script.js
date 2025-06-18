  //firebaseConfig
  const firebaseConfig = {
    apiKey: "AIzaSyCRKeXJg7ZFyoy2N3RoVgMFnaaHQ1y5WWE",
    authDomain: "wedding-3e426.firebaseapp.com",
    projectId: "wedding-3e426",
    storageBucket: "wedding-3e426.firebasestorage.app",
    messagingSenderId: "531046039955",
    appId: "1:531046039955:web:ac629474956529c160e866"
  };

  // 初始化 Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  function populateOptions(id) {
    const select = document.getElementById(id);
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "請選擇";
    select.appendChild(defaultOption);
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i} 位`;
      select.appendChild(option);
    }
  }

  function showError(message) {
    const errorEl = document.getElementById("formError");
    errorEl.innerText = message;
    errorEl.style.display = "block";
    setTimeout(() => errorEl.style.display = "none", 4000);
  }
  populateOptions("guest-count");
  populateOptions("guest-v");

  //控制嬰兒座椅張數欄位顯示
  function toggleBabySeatCount(show) {
    const container = document.getElementById("babySeatCountContainer");
    container.style.display = show ? "block" : "none";
  }

  // --- 主要改動區 ---
  document.addEventListener('DOMContentLoaded', () => {
    const attendance = document.getElementById('attendance');
    const guestCountGroup = document.getElementById('guest-count-group');
    const vegetarianGroup = document.getElementById('vegetarian').parentElement;
    const guestVGroup = document.getElementById('guest-v-group');
    const vegetarian = document.getElementById('vegetarian');
    const babySeatRadios = document.querySelectorAll('input[name="needBabySeat"]');
    const babySeatContainer = document.getElementById('babySeatCountContainer');
    // 取得radio外層div
    const babySeatRadioGroup = babySeatRadios[0].closest('div');

    function updateFormByAttendance() {
  if (attendance.value === "yes") {
    guestCountGroup.style.display = "block";
    vegetarianGroup.style.display = "block";
    guestVGroup.style.display = vegetarian.value === "yes" ? "block" : "none";
    babySeatRadioGroup.style.display = "block";
    babySeatContainer.style.display = document.querySelector('input[name="needBabySeat"]:checked')?.value === "是" ? "block" : "none";
    // 加 required
    document.getElementById('guest-count').setAttribute('required', 'required');
    document.getElementById('vegetarian').setAttribute('required', 'required');
    babySeatRadios.forEach(r => r.required = true);
  } else if (attendance.value === "no") {
    guestCountGroup.style.display = "block";
    vegetarianGroup.style.display = "block";
    guestVGroup.style.display = "none";
    babySeatRadioGroup.style.display = "block";
    babySeatContainer.style.display = "none";
    // 移除 required 並清空
    document.getElementById('guest-count').removeAttribute('required');
    document.getElementById('guest-count').value = "";
    document.getElementById('vegetarian').removeAttribute('required');
    document.getElementById('vegetarian').value = "";
    document.getElementById('guest-v').value = "";
    babySeatRadios.forEach(r => {
      r.checked = false;
      r.required = false;
    });
    document.getElementById('babySeatCount').value = "";
  }
}

    attendance.addEventListener('change', updateFormByAttendance);

    vegetarian.addEventListener('change', () => {
      guestVGroup.style.display = vegetarian.value === "yes" && attendance.value === "yes" ? "block" : "none";
    });

    babySeatRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        if (attendance.value === "yes") {
          toggleBabySeatCount(this.value === "是");
        }
        if (this.value !== "是") {
          document.getElementById('babySeatCount').value = "";
        }
      });
    });

    // 頁面載入時初始化
    updateFormByAttendance();

    // 表單提交事件
    document.getElementById('rsvp-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const relation = this.relation.value;
      const attendance = this.attendance.value;
      const guestCount = document.getElementById('guest-count').value || "0";
      const vegetarian = this.vegetarian.value;
      const guestV = document.getElementById('guest-v').value || "0";
      const form = this;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerText = "已送出…";
      if (attendance === "yes" && guestCount === "0") {
        alert("請選擇出席人數");
        submitBtn.disabled = false;
        submitBtn.innerText = "送出回覆";
        return;
      }
	 
      db.collection("rsvps").add({
        name,
        relation,
        attendance,
        guestCount,
        vegetarian,
        guestV,
        needBabySeat: form.needBabySeat.value,
        babySeatCount: form.babySeatCount.value || null,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        // 顯示感謝訊息，隱藏表單
        document.getElementById('rsvp-form').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';
        // 若有 reset 需求可加上這行（目前無需再 reset 因為不會再顯示）
        // form.reset();
      })
        .catch((error) => {
          alert("發生錯誤，請稍後再試！");
          console.error("Firestore 錯誤：", error);
          submitBtn.disabled = false;
          submitBtn.innerText = "送出回覆";
        });
      document.getElementById("babySeatCountContainer").style.display = 'none';
    });

    // 信封動畫與音樂觸發
    const envelope = document.getElementById('envelope');
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    const bgm = document.getElementById('bgm');

    let opened = false;
    envelope.addEventListener('click', () => {
      if (opened) return;
      opened = true;
      envelope.classList.add('open');
      setTimeout(() => {
        intro.style.opacity = 0;
        setTimeout(() => {
          intro.style.display = 'none';
          main.style.display = 'block';
          main.style.animation = 'fadeIn 1.5s ease forwards';
          // 啟動音樂
          bgm.volume = 0.2;
          bgm.muted = false;
          bgm.play();
          { once: true };
        }, 1500);
      });
    });
  });

