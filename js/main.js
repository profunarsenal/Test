const sidebar = document.querySelector('.sidebar');
const checkboxLocationAllBtn = document.querySelector('.location__checkbox--all');
const locationCheckboxes = document.querySelectorAll('.location__checkbox--distance');
const form = document.querySelector('.form');
const checkboxes = document.querySelectorAll('.checkbox__hidden');
const cardsBlock = document.querySelector('.cards');
const modal = document.querySelector('.modal');
const modalInfo = document.querySelector('.modal__info');
const modalImage = document.querySelector('.modal__image');

const renderModal = (id, cards) => {
  const title = document.createElement('h4');
  const info = document.createElement('ul');
  const image = document.createElement('img');
  const card = cards.find(card => card.id === id ? card : null);

  title.classList.add('modal__title');
  info.classList.add('modal__info-list');

  modalImage.innerHTML = '';
  modalInfo.innerHTML = '';

  image.src = card.image;

  title.innerHTML = `<span>ЖК</span> ${card.name}`;

  info.innerHTML = `
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Срок сдачи</span>
      <span class="modal__info-value">${card.term}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Метро</span>
      <span class="modal__info-value modal__info-value--metro">${card.metro}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Адрес</span>
      <span class="modal__info-value">${card.address}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Двор без машин</span>
      <span class="modal__info-value">${card.noCar ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Высокие потолки</span>
      <span class="modal__info-value">${card.ceiling ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Панорамные окна</span>
      <span class="modal__info-value">${card.window ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Есть кладовые</span>
      <span class="modal__info-value">${card.pantry ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Малоэтажный</span>
      <span class="modal__info-value">${card.floor ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Студия</span>
      <span class="modal__info-value">${card.studio ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">Вид на Волгу</span>
      <span class="modal__info-value">${card.river ? 'Да' : 'Нет'}</span>
    </li>
    <li class="modal__info-item">
      <span class="modal__info-subtitle">С ремонтом</span>
      <span class="modal__info-value">${card.repair ? 'Да' : 'Нет'}</span>
    </li>
   `;

  modalImage.append(image);
  modalInfo.append(title);
  modalInfo.append(info);
}

const openModal = () => {
  modal.classList.add('active');
  document.body.classList.add('lock');
}

const closeModal = () => {
  modal.classList.remove('active');
  document.body.classList.remove('lock');
}

const hideCards = () => {
  const cards = document.querySelectorAll('.card');
  const btnMore = document.querySelector('.btn-more');

  if (cards.length > 9) {
    btnMore.style.display = 'flex';

    cards.forEach((card, index) => {
      if (index > 8) {
        card.style.display = 'none';
      }
    })
  } else {
    btnMore.style.display = 'none';
  }

  btnMore.addEventListener('click', () => {
    cards.forEach(card => {
      if (card.style.display = 'none') {
        card.style.display = 'block';
        btnMore.style.display = 'none';
      }
    })
  })
}

const optionsFilter = (cards) => {
  const options = Array.from(document.querySelectorAll('.checkbox__btn-hide'));
  const optionsActive = options.filter(option => option.checked);

  if (optionsActive.length === 0) {
    render(cards)
  } else {
    optionsActive.forEach(option => {
      cards = cards.filter(card => card[option.value])
    })
    render(cards)
  }

}

const creditFilter = (cards) => {
  const creditBtn = document.querySelector('.credit__btn-hide');

  if (creditBtn.checked) {
    cards = cards.filter(card => card.credit)
    optionsFilter(cards);
  } else {
    cards = cards.filter(card => !card.credit)
    optionsFilter(cards);
  }
}

const radioFilter = (cards) => {
  const radioBtns = Array.from(document.querySelectorAll('.radio__btn-hide'));
  const radioBtnActive = radioBtns.filter(radio => radio.checked);

  if (radioBtnActive[0].value === 'Любая') {
    creditFilter(cards);
  } else {
    cards = cards.filter(card => card.term === radioBtnActive[0].value)
    creditFilter(cards);
  }
}

const filterLocation = (cards) => {
  const checkboxValues = Array.from(document.querySelectorAll('.location__checkbox'));
  const checkboxActive = checkboxValues.filter(checkbox => checkbox.checked);
  const cardArray = [];

  checkboxActive.forEach(checkbox => {
    if (checkbox.value === 'Любая') {
      radioFilter(cards)
    } else {
      cards.forEach(card => {
        if (card.distance === checkbox.value) {
          cardArray.push(card)
        }
      })

      radioFilter(cardArray)
    }
  })

}

const render = (cards) => {
  cardsBlock.innerHTML = '';

  if (cards.length === 0) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = 'Подходящих объявлений не найдено'
    cardsBlock.append(message)
  } else {
    cards.forEach(card => {
      const a = document.createElement('a');
      a.classList.add('card');
      a.href = '#';
      a.dataset.id = card.id;

      a.innerHTML = `
      <div class="card__header">
        <div class="card__sticker card__sticker--class">Комфорт</div>
          <div class="card__sticker card__sticker--credit" ${card.credit ? '' : 'style="display:none"'}>Рассрочка 12 мес.</div>
        </div>
        <div class="card__image">
          <img src="${card.image}" alt="">
        </div>
        <div class="card__content">
          <h4 class="card__title">ЖК ${card.name}</h4>
          <div class="card__term">${card.term}</div>
          <div class="card__metro">${card.metro}</div>
          <div class="card__address">${card.address}</div>
        </div>
      `;

      a.addEventListener('click', (e) => {
        const id = e.target.closest('.card').dataset.id;

        openModal();
        renderModal(id, cards);

        e.preventDefault();
      })

      cardsBlock.append(a)
    })

    hideCards()
  }

}

const getData = () => {
  return fetch('../db/db.json')
    .then(res => res.json())
}

checkboxLocationAllBtn.addEventListener('change', () => {
  if (checkboxLocationAllBtn.checked) {
    locationCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    })
  }
})

locationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkboxLocationAllBtn.checked = false;
    }
  })
})

form.addEventListener('reset', () => {
  form.reset();
  getData().then(data => filterLocation(data));
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData().then(data => filterLocation(data));
})

document.addEventListener('click', (e) => {
  if (e.target.closest('.sidebar-button--open')) {
    sidebar.classList.add('sidebar--open');
  } else if (e.target.closest('.sidebar-button--close') || !e.target.closest('.sidebar')) {
    sidebar.classList.remove('sidebar--open');
  }

  if (e.target.closest('.widget__title')) {
    e.target.classList.toggle('widget__title--show');
    e.target.nextElementSibling.classList.toggle('widget__body--show');
  }

  if (e.target.closest('.checkbox__btn-more')) {
    checkboxes.forEach(checkbox => {
      if (checkbox.style.display === 'none') {
        checkbox.style.display = 'block';
        e.target.textContent = 'Скрыть';
      } else {
        checkbox.style.display = 'none';
        e.target.textContent = 'Показать ещё';
      }
    })
  }

  if (e.target.closest('.modal__close-btn') || e.target.closest('.overlay')) {
    closeModal();
  }
})

getData().then(data => filterLocation(data))