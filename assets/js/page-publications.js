document.addEventListener("DOMContentLoaded", function () {
  var pubs = window.PUBLICATIONS_DATA;
  var pats = window.PATENTS_DATA;
  if (!pubs) return;

  var total = pubs.journalArticles.length + pubs.conferencePapers.length + pubs.books.length + pubs.bookChapters.length;
  document.getElementById("pub-summary").textContent =
    "共 " + total + " 篇研究著作（期刊 " + pubs.journalArticles.length + "、會議 " + pubs.conferencePapers.length +
    "、專書 " + pubs.books.length + "、專書論文 " + pubs.bookChapters.length + "），另有 " +
    (pats ? pats.patents.length : 0) + " 項專利（獨立列示，不計入論文/計畫）。";

  function doiBadge(p) {
    if (!p.doi) return '';
    var cls = p.doiStatus && p.doiStatus.indexOf("已驗證") === 0 ? "doi-verified" : "doi-pending";
    return '<span class="badge ' + cls + '">DOI: ' + p.doi + '</span>';
  }

  function titleHtml(p) {
    if (p.doi) {
      return '<a class="pub-title" href="https://doi.org/' + p.doi + '" target="_blank" rel="noopener">' + p.title + '</a>';
    }
    return '<div class="pub-title">' + p.title + '</div>';
  }

  function journalItem(p) {
    var metaParts = [p.venue];
    if (p.volume) metaParts.push("vol. " + p.volume);
    if (p.issue) metaParts.push("no. " + p.issue);
    if (p.pages) metaParts.push("pp. " + p.pages);
    if (p.articleNumber) metaParts.push("art. " + p.articleNumber);
    return '<div class="pub-item">' +
      '<div class="pub-year">' + p.year + '</div>' +
      '<div class="pub-body">' +
      '  ' + titleHtml(p) +
      '  <div class="pub-authors">' + p.authors + '</div>' +
      '  <div class="pub-meta">' + metaParts.join(', ') + '</div>' +
      '  <div class="pub-badges">' +
      (p.impactFactor ? '<span class="badge">IF ' + p.impactFactor + '</span>' : '') +
      (p.rank ? '<span class="badge">Rank ' + p.rank + '</span>' : '') +
      '<span class="badge">' + p.authorRole + '</span>' +
      doiBadge(p) +
      '  </div>' +
      '</div></div>';
  }

  function conferenceItem(p) {
    return '<div class="pub-item">' +
      '<div class="pub-year">' + p.year + '</div>' +
      '<div class="pub-body">' +
      '  <div class="pub-title">' + p.title + '</div>' +
      '  <div class="pub-authors">' + p.authors + '</div>' +
      '  <div class="pub-meta">' + p.venue + ' — ' + p.location + '</div>' +
      '  <div class="pub-badges"><span class="badge">' + p.scope + '</span><span class="badge">' + p.authorRole + '</span></div>' +
      '</div></div>';
  }

  function bookItem(p) {
    return '<div class="pub-item">' +
      '<div class="pub-year">' + p.year + '</div>' +
      '<div class="pub-body">' +
      '  <div class="pub-title">' + p.title + '</div>' +
      '  <div class="pub-authors">' + p.authors + '</div>' +
      '  <div class="pub-meta">' + p.publisher + ', ' + p.location + '</div>' +
      '</div></div>';
  }

  function chapterItem(p) {
    return '<div class="pub-item">' +
      '<div class="pub-year">' + p.year + '</div>' +
      '<div class="pub-body">' +
      '  <div class="pub-title">' + p.title + '</div>' +
      '  <div class="pub-authors">' + p.authors + '</div>' +
      '  <div class="pub-meta">收錄於《' + p.bookTitle + '》, ' + p.publisher + ', ' + p.location + '</div>' +
      '</div></div>';
  }

  document.getElementById("journal-list").innerHTML = pubs.journalArticles.map(journalItem).join("");
  document.getElementById("conference-list").innerHTML = pubs.conferencePapers.map(conferenceItem).join("");
  document.getElementById("book-list").innerHTML = pubs.books.map(bookItem).join("");
  document.getElementById("chapter-list").innerHTML = pubs.bookChapters.map(chapterItem).join("");

  if (pats) {
    document.getElementById("patent-rows").innerHTML = pats.patents.map(function (p) {
      return '<tr><td>' + p.number + '</td><td>' + p.kind + '</td><td>' + p.title + '</td><td>' + p.inventor + ' / ' + p.assignee + '</td><td>' + (p.country || '') + '</td></tr>';
    }).join("");
  }

  var sourceNote = ((pubs.source || "") + " " + ((pats && pats.source) || "")).trim();
  document.getElementById("pub-source-note").textContent = sourceNote;
  document.getElementById("pub-source-note").hidden = !sourceNote;
});
