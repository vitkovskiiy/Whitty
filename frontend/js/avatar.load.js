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
