export interface Cep {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    uf: string;
    localidade: string;
    erro?: boolean;
}