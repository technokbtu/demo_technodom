const API_KEY = "esuf1eJUVC8PMVo5rlv6T3BlbkFJlwO8NI3Pj099JG10abPn"

const config = `Ты ассистент Technodom. 
Ты должен помогать пользователям навигировать по веб-сайту, 
предоставлять детальную информацию о продуктах, 
рекомендовать товары на основе интересов и истории покупок пользователя. 
Ты должен уметь быстро и точно ответить на вопросы о ценах, наличии товара, 
его характеристиках и сравнении с другими продуктами. 
Твоя задача — обеспечивать поддержку клиентов в оформлении заказов, 
отслеживании их статуса и управлении возвратами. 
Ты должен быть доступен 24/7, 
обладать способностью обучаться на основе взаимодействий с пользователями, 
чтобы предлагать всё более релевантные и полезные решения. 
Твоя цель — улучшать клиентский опыт, делая покупки проще и удобнее.
`


const chatInput = document.querySelector('.chat-input textarea')
const sendChatBtn = document.querySelector('.chat-input img')
const chatbox = document.querySelector('.chatbox')
const chatBtn = document.querySelector('.chatbot-button')
const chatClose = document.querySelector('.header > img')

// const inputInitHeight = chatInput.scrollHeight

let userMessage

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li")
    chatLi.classList.add("chat", className)
    // app/index.html
    let imgSrc = "./public/icons/assistant.jpeg"
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<img src="${imgSrc}" alt="assistant" class="assistant"><p class="dots_animation">${message}</p>`
    chatLi.innerHTML = chatContent
    return chatLi
}


const generateResponse = async (incomingChatLi, userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions"

    const messageElement = incomingChatLi.querySelector("p")

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer sk-${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system", 
                    content: config
                },
                {
                    role: "user", 
                    content: userMessage
                }
            ]
        })
    }

    try {
        const response = await fetch(API_URL, requestOptions)
        const data = await response.json()
        messageElement.innerText = data.choices[0].message.content
    } catch (error) {
        console.error("Error fetching response:", error)
        messageElement.classList.add("error")
        messageElement.innerText = "Oops something went wrong. Please try again"
    } finally {chatbox.scrollTo(0, chatbox.scrollHeight)}
}


const handleChat = () => {
    const userMessage = chatInput.value.trim()
    if (!userMessage) return
    chatInput.value = ""
    // chatInput.style.height = `${inputInitHeight}px`

    chatbox.appendChild(createChatLi(userMessage, "outgoing"))
    chatbox.scrollTo(0, chatbox.scrollHeight)

    const incomingChatLi = createChatLi(`
            <span class="dot one"></span>
            <span class="dot two"></span>
            <span class="dot three"></span>
    `, "incoming")
    chatbox.appendChild(incomingChatLi)
    chatbox.scrollTo(0, chatbox.scrollHeight)

    generateResponse(incomingChatLi, userMessage)
}


// chatInput.addEventListener("input", () => {
//     chatInput.style.height = `${inputInitHeight}px`
//     chatInput.style.height = `${chatInput.scrollHeight}px`
// })

chatInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault()
        handleChat()
    }
})

sendChatBtn.addEventListener("click", handleChat)

chatBtn.addEventListener("click", () => document.querySelector("#show-chatbot").classList.toggle("show-chatbot"))
chatClose.addEventListener("click", () => document.querySelector("#show-chatbot").classList.toggle("show-chatbot"))
const chatOpen = () => {document.querySelector("#show-chatbot").classList.toggle("show-chatbot")} 