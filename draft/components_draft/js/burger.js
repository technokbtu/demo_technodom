document.addEventListener('DOMContentLoaded', function() {
    console.log('hello');
    const burger_button = document.querySelector('.burger-menu');
    const burger_info = document.querySelector('.burger-info');
    let opened = false;
    burger_button.addEventListener('click', () => {
        opened = !opened;
        console.log('click');
        burger_info.style.display = opened?'flex':'none';
    });
});