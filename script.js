
//firebaseConfig
//import { db } from "./FirebaseConfig/FirebaseConfig.js";
    
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
  errorEl.innerHTML = `<div style="padding: 15px; border-radius: 8px; background: #fff5f5; border: 2px solid #ff4444; text-align: center;">
    <span style="font-size: 24px;">❗</span>
    <div style="margin-top: 8px; font-weight: bold;">${message}</div>
  </div>`;
  
  errorEl.style.display = "block";
  errorEl.classList.add("error-shake");
  
  setTimeout(() => {
    errorEl.classList.remove("error-shake");
  }, 500);
  
  setTimeout(() => {
    errorEl.style.display = "none";
  }, 5000);
}
  populateOptions("guest-count");
  populateOptions("guest-v");

  //控制嬰兒座椅張數欄位顯示
  function toggleBabySeatCount(show) {
    const container = document.getElementById("babySeatCountContainer");
    container.style.display = show ? "block" : "none";
  }

function updateVegetarianOptions() {
  const guestCount = parseInt(document.getElementById('guest-count').value) || 0;
  const guestVSelect = document.getElementById('guest-v');
  
  // 清空現有選項
  guestVSelect.innerHTML = '';
  
  // 添加預設選項
  const defaultOption = document.createElement('option');
  defaultOption.value = "";
  defaultOption.textContent = "請選擇";
  guestVSelect.appendChild(defaultOption);
  
  // 只生成不超過總人數的選項
  for (let i = 1; i <= guestCount; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} 位`;
    guestVSelect.appendChild(option);
  }
}

// 在出席人數變更時更新素食選項
document.getElementById('guest-count').addEventListener('change', updateVegetarianOptions);

  // --- 主要改動區 ---
document.addEventListener('DOMContentLoaded', () => {
    const ceremonyGroup = document.getElementById('ceremony-group');
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
    // 顯示所有相關欄位
    guestCountGroup.style.display = "block";
    vegetarianGroup.style.display = "block";
    guestVGroup.style.display = vegetarian.value === "yes" ? "block" : "none";
    babySeatRadioGroup.style.display = "block";
    ceremonyGroup.style.display = "block";
    babySeatContainer.style.display = document.querySelector('input[name="needBabySeat"]:checked')?.value === "是" ? "block" : "none";
    
    // 設置必填
    document.getElementById('guest-count').setAttribute('required', 'required');
    document.getElementById('vegetarian').setAttribute('required', 'required');
    document.getElementById('ceremony').setAttribute('required', 'required');
    babySeatRadios.forEach(r => r.required = true);
    
  } else if (attendance.value === "no") {
    // 只隱藏與出席相關的細節欄位，保留基本欄位
    guestCountGroup.style.display = "none";
    vegetarianGroup.style.display = "none";
    guestVGroup.style.display = "none";
    babySeatRadioGroup.style.display = "none";
    ceremonyGroup.style.display = "none";
    babySeatContainer.style.display = "none";
    
    // 移除必填並清空值
    document.getElementById('guest-count').removeAttribute('required');
    document.getElementById('guest-count').value = "";
    document.getElementById('vegetarian').removeAttribute('required');
    document.getElementById('vegetarian').value = "";
    document.getElementById('guest-v').value = "";
    document.getElementById('ceremony').removeAttribute('required');
    document.getElementById('ceremony').value = "";
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
	
// 全局變量，標記是否正在提交中
let isSubmitting = false; 

    // 表單提交事件
    document.getElementById('rsvp-form').addEventListener('submit', function (e) {
      e.preventDefault();
	  document.getElementById('submit-loader').style.display = 'block';
	    
		// 防重複檢查
	  if (isSubmitting) {
  showError("系統正在處理您的回覆，請勿重複點擊！");
  document.getElementById('submit-loader').style.display = 'none';
  return;
}
if (sessionStorage.getItem('formSubmitted') === 'true') {
  showError("<span style='font-size:1.2em'>您已經成功提交過回覆！</span><br>請勿重複提交，我們已收到您的回函");
  document.getElementById('submit-loader').style.display = 'none';
  return;
}
  isSubmitting = true;
  sessionStorage.setItem('formSubmitted', 'true');
  const form = this;
  const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerText = "已送出…";
	  
	  
      const name = document.getElementById('name').value;
      const relation = this.relation.value;
      const attendance = this.attendance.value;
	  const ceremony = attendance === "yes" ? this.ceremony.value : "not_attending";
	  const guestCount = attendance === "yes" ? (document.getElementById('guest-count').value || "0") : "0";
      const vegetarian = attendance === "yes" ? this.vegetarian.value : "no";
      const guestV = attendance === "yes" ? (document.getElementById('guest-v').value || "0") : "0";
      const needBabySeat = attendance === "yes" ? form.needBabySeat.value : "否";
  const babySeatCount = attendance === "yes" ? (form.babySeatCount.value || null) : null;
      
	  
	  
	  // 防重複檢查
  
  
      
	  
      if (attendance === "yes" && vegetarian === "yes") {
    const totalGuests = parseInt(guestCount);
    const vegGuests = parseInt(guestV);
    
    if (vegGuests > totalGuests) {
      showError("素食人數不能超過總出席人數");
      submitBtn.disabled = false;
      submitBtn.innerText = "送出回覆";
      return;
    }
  }

  // 新增驗證3: 嬰兒座椅數量不能超過總人數
  if (attendance === "yes" && needBabySeat === "是" && babySeatCount > parseInt(guestCount)) {
    showError("嬰兒座椅數量不能超過總出席人數");
    submitBtn.disabled = false;
    submitBtn.innerText = "送出回覆";
    return;
  }

  // 所有驗證通過後提交表單
	 
      db.collection("rsvps").add({
        name,
    relation,
    attendance,
    guestCount,
    vegetarian,
    ceremony,
    guestV,
    needBabySeat,
    babySeatCount,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    isSubmitting = false;
    document.getElementById('rsvp-form').style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';
    document.getElementById('submit-loader').style.display = 'none';
  }).catch((error) => {
    isSubmitting = false;
    sessionStorage.removeItem('formSubmitted');
    document.getElementById('submit-loader').style.display = 'none';
    submitBtn.disabled = false;
    submitBtn.innerText = "送出回覆";
    alert("發生錯誤，請稍後再試！");
    console.error("Firestore 錯誤：", error);
        });
      //document.getElementById("babySeatCountContainer").style.display = 'none';
    });
	
	// 提交時


// 完成或失敗時
document.getElementById('submit-loader').style.display = 'none';

    // 信封動畫與音樂觸發
    const envelope = document.getElementById('envelope');
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    
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
          { once: true };
        }, 1500);
      });
    });
  });



  
