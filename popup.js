document.addEventListener('DOMContentLoaded', () => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    displayBookmarks(bookmarkTreeNodes);
  });
});

function displayBookmarks(bookmarkNodes) {
  const bookmarksList = document.getElementById('bookmarksList');
  bookmarkNodes.forEach((node) => {
    bookmarksList.appendChild(createBookmarkElement(node));
  });
}

function createBookmarkElement(node) {
  const li = document.createElement('li');
  if (node.url) {
    li.innerHTML = `<a href="${node.url}" target="_blank">${node.title}</a>`;
  } else {
    li.textContent = node.title;
  }

  if (node.children) {
    const ul = document.createElement('ul');
    node.children.forEach((childNode) => {
      ul.appendChild(createBookmarkElement(childNode));
    });
    li.appendChild(ul);
  }
  return li;
}
