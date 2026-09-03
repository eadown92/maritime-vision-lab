document.addEventListener("DOMContentLoaded", function () {
  var p = window.PEOPLE_DATA;
  if (!p) return;

  function personCard(person, roleFallback) {
    var photo = person.photo
      ? '<img src="' + person.photo + '" alt="' + person.name_zh + '" style="width:96px;height:96px;object-fit:cover;border-radius:8px;float:right;margin-left:14px;">'
      : '';
    return '<div class="card" style="overflow:auto;">' +
      photo +
      '<h3>' + person.name_zh + '</h3>' +
      '<p class="en">' + person.name_en + '</p>' +
      '<p class="desc">' + (person.role_zh || roleFallback || '') + '</p>' +
      (person.dept_zh ? '<p class="desc" style="color:var(--muted);">' + person.dept_zh + '</p>' : '') +
      (person.email ? '<p class="desc"><a href="mailto:' + person.email + '">' + person.email + '</a></p>' : '') +
      (person.office ? '<p class="desc" style="color:var(--muted);">辦公室：' + person.office + '</p>' : '') +
      (person.googleScholar ? '<p class="desc"><a href="' + person.googleScholar + '" target="_blank" rel="noopener">Google 學術搜尋 →</a></p>' : '') +
      (person.bio_zh ? '<p class="desc" style="margin-top:8px;">' + person.bio_zh + '</p>' : '') +
      '</div>';
  }

  document.getElementById("pi-list").innerHTML = p.pi.map(function (x) { return personCard(x); }).join("");

  var memberList = document.getElementById("member-list");
  if (p.members && p.members.length) {
    memberList.innerHTML = p.members.map(function (x) { return personCard(x); }).join("");
  } else {
    memberList.innerHTML = '';
    document.getElementById("member-note").textContent = "研究成員資料持續更新中。";
  }

  var alumniList = document.getElementById("alumni-list");
  if (p.alumni && p.alumni.length) {
    alumniList.innerHTML = p.alumni.map(function (x) { return personCard(x); }).join("");
  } else {
    alumniList.innerHTML = '<p class="note-box">尚無校友資料。</p>';
  }
});
