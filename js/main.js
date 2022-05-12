const sidebar = document.querySelector('.sidebar');
const locationCheckbox = document.querySelector('.location__checkbox--all');
const locationCheckboxes = document.querySelectorAll('.location__checkbox--distance');
const btnWidgets = document.querySelectorAll('.widget__title');
const form = document.querySelector('.form');
const checkboxes = document.querySelectorAll('.checkbox__hidden');
const btnCheckboxMore = document.querySelector('.checkbox__btn-more');
const cardsBlock = document.querySelector('.cards');

const optionsFilter = (cards) => {
  const options = Array.from(document.querySelectorAll('.checkbox__btn-hide'));
  const optionsActive = options.filter(option => option.checked ? option : undefined);
  const cardArray = [];

  if (optionsActive.length === 0) {
    render(cards)
  } else {
    optionsActive.forEach(option => {
      cards.forEach(card => {
        if (card[option.value] === true) {
          cardArray.push(card)
        }
      })
    })
    render(cardArray)
  }

}

const radioFilter = (cards) => {
  const radioBtns = Array.from(document.querySelectorAll('.radio__btn-hide'));
  const radioBtnActive = radioBtns.filter(radio => radio.checked ? radio : undefined);
  const cardArray = [];

  if (radioBtnActive[0].value === 'Любая') {
    optionsFilter(cards);
  } else {
    cards.forEach(card => {
      if (card.term === radioBtnActive[0].value) {
        cardArray.push(card);
      }
    })

    optionsFilter(cardArray);
  }
}


const filterLocation = (cards) => {
  const checkboxValues = Array.from(document.querySelectorAll('.location__checkbox'));
  const checkboxActive = checkboxValues.filter(checkbox => checkbox.checked ? checkbox : undefined);
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

      console.log(cardArray)
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

      a.innerHTML = `
      <div class="card__header">
        <div class="card__sticker card__sticker--class">Комфорт</div>
          <div class="card__sticker card__sticker--credit">Рассрочка 12 мес.</div>
        </div>
        <div class="card__image">
          <img src="${card.image}" alt="">
        </div>
        <div class="card__content">
          <h4 class="card__title">${card.name}</h4>
          <div class="card__term">${card.term}</div>
          <div class="card__metro">${card.metro}</div>
          <div class="card__address">${card.address}</div>
        </div>
      `;

      cardsBlock.append(a)
    })
  }

}

const getData = () => {
  return fetch('https://api.jsonbin.io/b/627be88d25069545a3329db2/1')
    .then(res => res.json())
}

locationCheckbox.addEventListener('change', () => {
  if (locationCheckbox.checked) {
    locationCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    })
  }
})

locationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      locationCheckbox.checked = false;
    }
  })
})

btnWidgets.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('widget__title--show');
    btn.nextElementSibling.classList.toggle('widget__body--show');
  })
})

btnCheckboxMore.addEventListener('click', () => {
  checkboxes.forEach(checkbox => {
    if (checkbox.style.display === 'none') {
      checkbox.style.display = 'block';
      btnCheckboxMore.textContent = 'Скрыть';
    } else {
      checkbox.style.display = 'none';
      btnCheckboxMore.textContent = 'Показать ещё';
    }
  })
})

form.addEventListener('reset', () => {
  form.reset();
  getData().then(data => render(data));
})

form.addEventListener('submit', (e) => {
  getData().then(data => filterLocation(data));
  e.preventDefault();
})

document.addEventListener('click', (e) => {
  if (e.target.closest('.sidebar-button--open')) {
    sidebar.classList.add('sidebar--open');
  } else if (e.target.closest('.sidebar-button--close') || !e.target.closest('.sidebar')) {
    sidebar.classList.remove('sidebar--open');
  }
})

getData().then(data => render(data))