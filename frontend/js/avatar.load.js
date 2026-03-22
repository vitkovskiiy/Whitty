const modalAvatar = document.getElementById("avatar-modal");
const openBtnAvatar = document.getElementById("set-avatar-btn");
const closeBtnAvatar = document.getElementById("close-modal");
const profilePic = document.getElementById("profile-pic");
const formAvatar = document.getElementById("avatarForm");
const feedButton = document.getElementById("feed-button");

async function getCurrentUser() {
  const res = await fetch("/auth/me");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
async function loadCurrentAvatar() {
  try {
    const user = await getCurrentUser();
    if (user.avatar) {
      document.getElementById("profile-pic").src = user.avatar;
    }
  } catch (err) {
    console.error("❌ Ошибка получения данных пользователя:", err);
  }
}
loadCurrentAvatar();

formAvatar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(formAvatar);
  try {
    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Ошибка сервера: ${res.status} ${errText}`);
    }
    const avatarPath = await res.json();
    profilePic.src = avatarPath.avatar;
    modal.classList.add("hidden");1
  } catch (err) {
    console.error("❌ Ошибка загрузки:", err);
    alert("Ошибка загрузки: " + err.message);
  }
});

document.getElementById("logout-button").addEventListener("click", function () {
  console.log("work");
  window.location.href = "/logout";
});
document.getElementById("chat-button").addEventListener("click", function () {
  console.log("work");
  window.location.href = "/chat";
});

feedButton.addEventListener("click", function () {
  console.log("clicked");
  window.location.href = "/feed";
});
openBtnAvatar.addEventListener("click", () => modalAvatar.classList.remove("hidden"));
closeBtnAvatar.addEventListener("click", () => modalAvatar.classList.add("hidden"));
