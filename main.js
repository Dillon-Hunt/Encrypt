alphabet =            "tuij3kn$2wxyef6#l7m&*(qr890v<b;'a-+_={cpo!@}[z~`%)>?^\\gh54.,s:d\"]|/1"
alphabetUnscrambled = "abcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[]{}\\|;:/\"',.<>?"
intagerMultiplyKey = "hello,world!"
alphabetShiftKey = 30
railFenceCipherKey = intagerMultiplyKey.length % 50 + 1

document.getElementsByClassName('encrypt-input-field')[0].addEventListener('keydown', () => {
    intagerMultiplyKey = document.getElementsByClassName('encrypt-input-field')[0].value
    intagerMultiplyKey = lowercase(intagerMultiplyKey)
    intagerMultiplyKey = removeSpaces(intagerMultiplyKey)
    railFenceCipherKey = intagerMultiplyKey.length % 50 + 1
    document.getElementsByClassName('encrypt-input-label')[0].textContent = "Key 1: " + intagerMultiplyKey
    text = document.getElementsByClassName('encrypt-input')[0].value
    text = lowercase(text)
    text = removeSpaces(text)
    text = reverse(text)
    text = alphabetCipherEncrypt(text)
    text = railFenceCipherEncrypt(text)
    text = convertToIntegers(text)
    document.getElementsByClassName('encrypt-output')[0].textContent = text
    document.getElementsByClassName('decrypt-output')[0].textContent = "Edit Text To See Output"
})

document.getElementsByClassName('encrypt-input-field-slider')[0].addEventListener('change', () => {
    alphabetShiftKey = parseInt(document.getElementsByClassName('encrypt-input-field-slider')[0].value)
    document.getElementsByClassName('encrypt-input-label-slider')[0].textContent = "Key 2: " + alphabetShiftKey
    text = document.getElementsByClassName('encrypt-input')[0].value
    text = lowercase(text)
    text = removeSpaces(text)
    text = reverse(text)
    text = alphabetCipherEncrypt(text)
    text = railFenceCipherEncrypt(text)
    text = convertToIntegers(text)
    document.getElementsByClassName('encrypt-output')[0].textContent = text
    document.getElementsByClassName('decrypt-output')[0].textContent = "Edit Text To See Output"
})

document.getElementsByClassName('encrypt-input')[0].addEventListener('keyup', () => {
    text = document.getElementsByClassName('encrypt-input')[0].value
    text = lowercase(text)
    text = removeSpaces(text)
    text = reverse(text)
    text = alphabetCipherEncrypt(text)
    text = railFenceCipherEncrypt(text)
    text = convertToIntegers(text)
    document.getElementsByClassName('encrypt-output')[0].textContent = text
})

document.getElementsByClassName('decrypt-input')[0].addEventListener('keyup', () => {
    text = document.getElementsByClassName('decrypt-input')[0].value
    text = convertFromIntegers(text)
    text = railFenceCipherDecrypt(text)
    text = alphabetCipherDecrypt(text)
    text = reverse(text)
    document.getElementsByClassName('decrypt-output')[0].textContent = text
})

function lowercase(text) {
    text = text.toLowerCase()
    return text
}

function removeSpaces(text) {
    text = text.replaceAll(" ", "")
    return text
}

function reverse(oldText) {
    text = ""
    for (character = oldText.length - 1; character >= 0; character--) {
        text += oldText[character]
    }
    return text
}

function alphabetCipherEncrypt(oldText) {
    text = ""

    for (character = oldText.length - 1; character >= 0; character--) {
        if ((alphabet.indexOf(oldText[character]) - alphabetShiftKey) < 0) {
            text += alphabet[alphabet.indexOf(oldText[character]) - alphabetShiftKey + 68]
        } else {
            text += alphabet[alphabet.indexOf(oldText[character]) - alphabetShiftKey]
        }
    }

    newText = ""

    for (i = 0; i < text.length; i++) {
        for (x = 0; x < intagerMultiplyKey.length && i < text.length; x++) {

            if (alphabetUnscrambled.indexOf(text[i]) + alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x]) > 67) {
                newText += alphabetUnscrambled[alphabetUnscrambled.indexOf(text[i]) + alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x]) - 68]
            } else {
                newText += alphabetUnscrambled[alphabetUnscrambled.indexOf(text[i]) + alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x])]
            }

            if (x < intagerMultiplyKey.length - 1) {
                i++
            }
        }
    }

    return newText
}

function alphabetCipherDecrypt(oldText) {
    text = ""

    for (i = 0; i < oldText.length; i++) {

        for (x = 0; x < intagerMultiplyKey.length && i < oldText.length; x++) {

            if (alphabetUnscrambled.indexOf(oldText[i]) - alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x]) < 0) {
                text += alphabetUnscrambled[alphabetUnscrambled.indexOf(oldText[i]) - alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x]) + 68]
            } else {
                text += alphabetUnscrambled[alphabetUnscrambled.indexOf(oldText[i]) - alphabetUnscrambled.indexOf(intagerMultiplyKey.toLowerCase()[x])]
            }

            if (x < intagerMultiplyKey.length - 1) {
                i++
            }
        }
    }

    newText = ""

    for (character = text.length - 1; character >= 0; character--) {
        if ((alphabet.indexOf(text[character]) + alphabetShiftKey) > 67) {
            newText += alphabet[alphabet.indexOf(text[character]) + alphabetShiftKey - 68]
        } else {
            newText += alphabet[alphabet.indexOf(text[character]) + alphabetShiftKey]
        }
    }


    return newText
}

function railFenceCipherEncrypt(oldText) {
    text = ""
    grid = Array.from({length:railFenceCipherKey}, () => Array.from({length:oldText.length}, () => undefined))
    down = true
    y = 0

    for (x = 0; x < oldText.length; x++) {

        grid[y][x] = oldText[x]
        
        if (y == railFenceCipherKey - 1) {
            down = false;
        } else if (y == 0) {
            down = true;
        }

        if (down) {
            y++
        } else {
            y--
        }
    }
    

    for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[0].length; y++) {
            if (grid[x][y] !== undefined) {
                text += grid[x][y]
            }
        }
    }

    return text
}

function railFenceCipherDecrypt(oldText) {
    text = ""
    grid = Array.from({length:railFenceCipherKey}, () => Array.from({length:oldText.length}, () => undefined))
    down = true

    y = 0

    for (x = 0; x < oldText.length; x++) {

        grid[y][x] = "0"
        
        if (y == railFenceCipherKey - 1) {
            down = false;
        } else if (y == 0) {
            down = true;
        }

        if (down) {
            y++
        } else {
            y--
        }
    }

    i = 0

    for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[0].length; y++) {
            if (grid[x][y] !== undefined) {
                grid[x][y] = oldText[i]
                i++
            }
        }
    }

    y = 0

    for (x = 0; x < oldText.length; x++) {
        
        text += grid[y][x]
        
        if (y == railFenceCipherKey - 1) {
            down = false;
        } else if (y == 0) {
            down = true;
        }

        if (down) {
            y++
        } else {
            y--
        }
    }
    
    return text
}

function convertToIntegers(oldText) {
    text = ""

    key = 0

    for (i = 0; i < intagerMultiplyKey.length; i++) {
        key += intagerMultiplyKey.charCodeAt(i) * intagerMultiplyKey.charCodeAt(i) + intagerMultiplyKey.charCodeAt(i)
    }

    for (character = 0; character < oldText.length; character++) {
        text += alphabetUnscrambled.indexOf(oldText[character]) * key + " "
    }

    return text
}

function convertFromIntegers(oldText) {
    text = ""

    key = 0

    for (i = 0; i < intagerMultiplyKey.length; i++) {
        key += intagerMultiplyKey.charCodeAt(i) * intagerMultiplyKey.charCodeAt(i) + intagerMultiplyKey.charCodeAt(i)
    }

    arrayText = oldText.split(" ").filter((item) => {return item != ""})

    for (i = 0; i < arrayText.length; i++) {
        text += alphabetUnscrambled[ (arrayText[i] / key) ]
    }

    return text
}