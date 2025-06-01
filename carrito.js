document.addEventListener('DOMContentLoaded', () => {
  const cart = {};

  const createCartUI = () => {
    const cartContainer = document.createElement('div');
    cartContainer.id = 'cart-container';
    cartContainer.style.position = 'fixed';
    cartContainer.style.bottom = '100px';
    cartContainer.style.right = '30px';
    cartContainer.style.background = '#111827';
    cartContainer.style.color = '#fff';
    cartContainer.style.padding = '15px';
    cartContainer.style.borderRadius = '12px';
    cartContainer.style.maxWidth = '300px';
    cartContainer.style.display = 'none';
    cartContainer.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    cartContainer.style.zIndex = '1000';

    const cartTitle = document.createElement('strong');
    cartTitle.textContent = 'Carrito:';
    const list = document.createElement('ul');
    list.id = 'cart-list';
    list.style.listStyle = 'none';
    list.style.padding = '10px 0';

    const btnFinalizar = document.createElement('button');
    btnFinalizar.textContent = 'Finalizar Compra';
    btnFinalizar.style.background = '#25d366';
    btnFinalizar.style.border = 'none';
    btnFinalizar.style.color = '#fff';
    btnFinalizar.style.padding = '10px 15px';
    btnFinalizar.style.borderRadius = '8px';
    btnFinalizar.style.cursor = 'pointer';
    btnFinalizar.style.marginTop = '10px';
    btnFinalizar.onclick = () => {
      if (Object.keys(cart).length === 0) {
        alert('Tu carrito está vacío.');
        return;
      }

      let message = 'Hola! Estoy interesado en los siguientes productos:%0A';
      for (const [product, qty] of Object.entries(cart)) {
        message += `- ${product} x${qty}%0A`;
      }

      window.open(`https://wa.me/573506129389?text=${message}`, '_blank');
    };

    cartContainer.append(cartTitle, list, btnFinalizar);
    document.body.appendChild(cartContainer);
  };

  const updateCartUI = () => {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';

    for (const [name, qty] of Object.entries(cart)) {
      const li = document.createElement('li');
      li.style.marginBottom = '10px';

      li.innerHTML = `
        ${name} x${qty}
        <button data-product="${name}" class="increase">+</button>
        <button data-product="${name}" class="decrease">-</button>
      `;

      list.appendChild(li);
    }

    document.querySelectorAll('.increase').forEach(btn => {
      btn.onclick = () => {
        const product = btn.dataset.product;
        cart[product]++;
        updateCartUI();
      };
    });

    document.querySelectorAll('.decrease').forEach(btn => {
      btn.onclick = () => {
        const product = btn.dataset.product;
        cart[product]--;
        if (cart[product] <= 0) delete cart[product];
        updateCartUI();
      };
    });
  };

  const toggleCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
  };

  // Agregar botón flotante de carrito
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '🛒 Ver Carrito';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '40px';
  toggleBtn.style.right = '100px';
  toggleBtn.style.padding = '15px';
  toggleBtn.style.background = '#4facfe';
  toggleBtn.style.border = 'none';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.borderRadius = '10000px';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.zIndex = '10000';
  toggleBtn.onclick = toggleCart;

  document.body.appendChild(toggleBtn);
  createCartUI();

  // Agregar botón "Agregar al carrito" a cada producto
  document.querySelectorAll('.product-card').forEach(card => {
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Agregar al carrito';
    addBtn.style.marginTop = '100px';
    addBtn.style.padding = '100px';
    addBtn.style.background = '#25d366';
    addBtn.style.color = '#fff';
    addBtn.style.border = 'none';
    addBtn.style.borderRadius = '8px';
    addBtn.style.cursor = 'pointer';
    addBtn.style.fontWeight = 'bold';

    const name = card.querySelector('.product-name')?.textContent.trim();
    addBtn.onclick = (e) => {
      e.preventDefault();
      if (!name) return;

      cart[name] = (cart[name] || 0) + 1;
      updateCartUI();
    };

    card.appendChild(addBtn);
  });
});

