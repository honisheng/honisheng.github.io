// 展開/收合功能
function toggleSection(id) {
      const section = document.getElementById(id);
      section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
    }

    // 出席選項控制人數選單
document.addEventListener('DOMContentLoaded', () => {
  const attendanceSelect = document.getElementById('attendance');
  const guestCountGroup = document.getElementById('guest-count-group');
  attendanceSelect.addEventListener("change", () => {
    guestCountGroup.style.display = attendanceSelect.value === "yes" ? "block" : "none";
  });
  //
  const vegetarianSelect = document.getElementById('vegetarian');
  const guestVGroup = document.getElementById('guest-v-group');
  vegetarianSelect.addEventListener("change", () => {
    guestVGroup.style.display = vegetarianSelect.value === "yes" ? "block" : "none";
  });
  
	// 表單送出提示
      document.getElementById('rsvp-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('感謝您的回覆！我們期待與您共度美好時光。');
		// 此處可加入將表單資料發送到伺服器的程式碼
        this.reset();
        guestGroup.style.display = 'none';
      });
    });
/*愛心特效*/
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 2 + "s";
      document.getElementById("hearts").appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
    setInterval(createHeart, 300);
/*music*/
	document.addEventListener('click', () => {
    const bgm = document.getElementById('bgm');
    bgm.volume = 0.2;
	bgm.muted = false;
    bgm.play();
  }, { once: true });
  
  /*信封JS*/
  const envelope = document.getElementById('envelope');
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    envelope.addEventListener('click', () => {
      envelope.classList.add('open');
      setTimeout(() => {
        intro.style.opacity = 0;
        setTimeout(() => {
          intro.style.display = 'none';
          main.style.display = 'grid';
        }, 1000);
      }, 1500);
    });
  