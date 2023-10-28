import React from "react";

function Admin() {
  const menuItems = document.querySelectorAll('.sidebar li');

  menuItems.forEach((item) => {
    item.addEventListener('click', function() {
      const page = this.textContent;
      displayPage(page);
    });
  });

  function displayPage(page) {
    const content = document.querySelector('.content h2');
    const message = document.querySelector('.content p');

    content.textContent = page;
    message.textContent = `You are currently viewing the ${page} page.`;
  }
}

export default Admin;
