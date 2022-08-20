class ValidaFormulario {
    constructor(){
        this.formulario = this.formulario.querySelector('.formulario')
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
        const senhasValidas = this.senhasValidas();

        if(camposValidos && senhasValidas){
            alert('Formulário enviado');
            this.formulario.submit();
        }
    }

    senhasValidas(){
        let valid = true;
        const senha = this.formulario.querySelector('.senhaTxt');
        const repetirSenha = this.formulario.querySelector('.repetir-senhaTxt');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.createError(senha, 'As senhas precisam ser iguais')
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.createError(senha, 'A senha precisa ter entre 6 e 12 caracteres')
        }
        return valid;
    }

    validInput(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML.replace(':', '');
            if(!campo.value){
                this.createError(campo, `Campo "${label}" não pode estar vazio!`);
                valid = false;
            }

            if(campo.classList.contains('cpfTxt')){
                if(!this.validaCpf(campo)) valid = false;
            }

            if(campo.classList.contains('usuarioTxt')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid
        
    }

    validaCpf(campo){
        const cpf = new ValidadorCpf(campo.value); //chamando a classe ValidadorCpf presente no doc validadorCPFv2

        if(!cpf.valida()){
            this.createError(campo, 'CPF inválido');
            return false;
        }

        return true;
    }

    validaUsuario(campo){
        const usuario = campo.value
        let valid = true
        if (usuario.length < 3 || usuario.length > 12){
            this.createError(campo, 'O nome de usuário deve ter entre 3 e 12 caracteres');
            valid = false;
        }
        if(!usuario.match(/[a-zA-Z0-9]S/g)){
            this.createError(campo, 'O nome de usuário só pode ter letras e/ou números');
            valid = false;
        }
        return valid;
    }

    createError(campo, msg){
        const div = this.formulario.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidaFormulario();
