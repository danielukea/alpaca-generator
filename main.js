const changeOption = (attr, value) => {
    let key = `image_${attr}`
    let pic = document.getElementById(key)
    let path = assets[attr][value] || ''
    pic.setAttribute('src', path)
}

const randomize = () => {
    Object.entries(assets).forEach(([key, value]) => {
        let options = Object.keys(value)
        let randIdx = Math.floor(Math.random() * options.length)
        changeOption(key, options[randIdx])
    })
}

const download =async () => {
    let image = document.getElementById('avatar-result')
    const canvas = await html2canvas(image)
    debugger;
    const base64 = canvas.toDataURL();
    const a = document.createElement("a")
    a.href = base64;
    a.download = 'alpaca-avatar.png'
    a.click()
}

const renderButton = (name, onclick) => {
    let elem = document.createElement('button')
    elem.textContent = name
    elem.classList.add('togglebutton')
    elem.onclick = onclick
    elem.id = `id_${name}`
    elem.value = name
    return elem;
}

const renderOptions = () => {
    let attr = characteristic.getAttribute('activeAttr')
    let activeOptions = Object.keys(assets[attr])

    let newOpts = activeOptions.map((each) => {
        return renderButton(each, (e) => {
            let value = e.composedPath()[0].value
            changeOption(attr, value)
        }
        )
    }
    )
    options.replaceChildren(...newOpts)
}

const toggleButton = (val) => {
    var choice = document.getElementById('choice_1')
    choice.setAttribute('activeAccessory', val)
}

document.addEventListener("DOMContentLoaded", () => {
    var characteristic = document.getElementById("characteristic")
    var options = document.getElementById('options')

    characteristic.setAttribute("activeAttr", 'accessories')
    if (options.children.length === 0) { renderOptions() }

    var charOptions = Object.keys(assets)

    const toggleAttr = (event) => {
        let elem = event.composedPath()[0]
        characteristic.setAttribute('activeAttr', elem.value)
        renderOptions()
    }

    charOptions.forEach((attr) => {
        let elem = renderButton(attr, toggleAttr)
        characteristic.appendChild(elem)
    }
    )
}
)



