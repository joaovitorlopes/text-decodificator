const swapWords = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
};

const elements = {
    inputTextArea: document.querySelector('.section-main-input'),
    encodeButton: document.querySelector('.btn-criptografar'),
    decodeButton: document.querySelector('.btn-descriptografar'),
    resultContainer: document.querySelector('.section-result-card'),
    copyButton: document.querySelector('.btn-copy'),
    resultTextArea: document.querySelector('.section-result-output'),
    startResultContainer: document.querySelector('.section-result-start'),
    alertMessage: document.getElementById('errorMessage'),
    encryptedText: '',
}

function codeText (value) {
    return Array.from(value.toLocaleLowerCase())
    .map( (i) => swapWords[i] ?? i)
    .join('');
}

function decodeText(text) {
    const reverseWords = Object.fromEntries(
      Object.entries(swapWords).map(([k, v]) => [v, k])
    );
    Object.keys(reverseWords).forEach((k) => {
      text = text.split(k).join(reverseWords[k]);
    });
    return text;
  }

function validateText () {
    return elements.encryptedText.match(/^[a-z\s]+$/i);
}

function invalidEntry () {
    elements.alertMessage.style.color = 'red';
    setTimeout( () => {
        elements.alertMessage.style.color = '#495057';
    }, 500);
}

function showResultEmpty() {
    elements.resultContainer.style.display = 'none';
    elements.startResultContainer.style.display = 'flex';
}

function showResultCard (value) {
    elements.resultTextArea.value = value;
    elements.startResultContainer.style.display = 'none';
    elements.resultContainer.style.display = 'flex';
}

elements.copyButton.onclick = () => {
    navigator.clipboard.writeText(elements.encryptedText).then(() => {
        alert('Texto copiado para a área de transferência.')
    });
};

elements.encodeButton.onclick = () => {
    elements.encryptedText = elements.inputTextArea.value;
    if (!validateText()) {
        showResultEmpty()
        return invalidEntry();
    }
    elements.encryptedText = codeText(elements.encryptedText);
    elements.inputTextArea.value = '';
    showResultCard(elements.encryptedText);
};

elements.decodeButton.onclick = () => {
    elements.encryptedText = elements.inputTextArea.value;

    if (!validateText()) {
        showResultEmpty()
        return invalidEntry();
    }
    elements.encryptedText = decodeText(elements.encryptedText);
    elements.inputTextArea.value = '';
    showResultCard(elements.encryptedText);
};