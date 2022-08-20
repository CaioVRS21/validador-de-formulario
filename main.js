class ValidaFormulario {
    constructor(){
        const formulario = document.querySelector('.formulario')
        this.eventos();
    }

    eventos(){
        this.formulario = addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.validInput();
    }

    validInput(){
        let valid = true;

        for(let errorText of document.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of document.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML.replace(':', '');
            if(!campo.value){
                this.createError(campo, `Campo "${label}" não pode estar vazio!`);
                valid = false;
            }
        }
        
    }

    createError(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidaFormulario();
