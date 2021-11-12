const gameId = document.getElementById('game_id');
const gameName = document.getElementById('game_name');
const gamePrice = document.getElementById('price');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/add',
        data: {
            game_id: gameId.value,
            game_name: gameName.value,
            game_price: gamePrice.value
        }
    });
});

deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'delete',
        url: '/delete',
        data: {
            game_id: gameId.value,
            game_name: gameName.value,
            game_price: gamePrice.value
        }
    });
});
