const div = document.querySelector(".queues")
const lis = document.querySelectorAll(".drop-down-list li")

lis.forEach(li => {
    li.addEventListener("click", () => {
        console.log(li.textContent);
        const val = li.textContent;
        let output = `
                <div class="queues">
                    <div class="content">
                        <h2>Ваша услуга: ${val}</h2>
                        <p>Оставшееся время: ≈5 мин.</p>
                    </div>
                    <section>
                        
                    </section>
                </div>
        `;
        div.innerHTML = output;
        
        const section = document.querySelector('section')
        const you = `<h4 class="you">Это вы</h4>`
        output = `
                <div class="queue">
                    <h3>Номер: 4</h3>
                    <p>Займет времени: ≈5 мин.</p>
                </div>

                <div class="queue">
                    ${you}
                    <h3>Номер: 4</h3>
                    <p>Займет времени: ≈5 мин.</p>
                </div>

                <div class="queue">
                    <h3>Номер: 4</h3>
                    <p>Займет времени: ≈5 мин.</p>
                </div>

        `
        section.innerHTML = output
    });
});

