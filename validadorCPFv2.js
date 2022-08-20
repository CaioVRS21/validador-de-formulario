//705.484.450-52  070.987.720-03
class ValidadorCpf {
    //Para capturar e limpar o cpf enviado
    constructor (cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo',{ get: function(){
            return cpfEnviado.replace(/\D+/g, ''); ///\D+/g é qualquer caractere que não seja um número
        }})
    }
    
    //metódo para a validação dos dados
    valida(){
    if (typeof this.cpfLimpo === 'undefined')return false;
    if(this.cpfLimpo.length != 11) return false;
    if (this.isSequencia()) return false;


    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidadorCpf.criaDigito(cpfParcial);
    const digito2 = ValidadorCpf.criaDigito(cpfParcial + digito1);
    //Para criar o digito final do cpf
    const novoCpf = cpfParcial + digito1 + digito2;
    //Se o novo cpf for igual ao enviado então o cpf enviado é válido
    return novoCpf === this.cpfLimpo;
}

//Para criar o digito do cpf
    static criaDigito (cpfParcial){
    const cpfArray = Array.from(cpfParcial)
    let contadorRegressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, val) => {
        ac += Number(val) * contadorRegressivo--
        return ac
    }, 0)
    let digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito);
}

//Para checar se os números do cpf não são todos iguais
    isSequencia (){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}
}

const cpf = new ValidadorCpf('070.987.720-03')

// if (cpf.valida()){
//     console.log('CPF válido');
// } else{
//     console.log('CPF inválido')
// };