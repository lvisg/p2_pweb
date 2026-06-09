package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Autenticador;
import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.model.Email;
import br.com.fatec.apibbds.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import br.com.fatec.apibbds.service.FerramentaService;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final FerramentaService ferramentaService;
    public ClienteService(ClienteRepository clienteRepository, FerramentaService ferramentaService){
        this.clienteRepository=clienteRepository;
        this.ferramentaService=ferramentaService;
    }

    public Optional<Cliente> carregar(String cpf){
        return clienteRepository.findByCpf(cpf);
    }

    public Cliente salvar(Cliente cliente) throws Exception{
        if(carregar(cliente.getCpf()).isPresent()){
            throw new Exception ("CPF já cadastrado");
        }else{
            return clienteRepository.save(cliente);
        }

    }

    public void deletar(String cpf){
        clienteRepository.deleteByCpf(cpf);
    }
    public Optional<Cliente> alterar(Cliente cliente, String cpf) {
        return clienteRepository.findByCpf(cpf).map(obj -> {
            obj.setCep(cliente.getCep());
            obj.setBairro(cliente.getBairro());
            obj.setNome(cliente.getNome());
            obj.setSobrenome(cliente.getSobrenome());
            obj.setEmail(cliente.getEmail());
            obj.setTelefone(cliente.getTelefone());
            obj.setCpf(cliente.getCpf());
            obj.setLogradouro(cliente.getLogradouro());
            obj.setNumero(cliente.getNumero());
            obj.setComplemento(cliente.getComplemento());
            obj.setEstado(cliente.getEstado());
            obj.setCidade(cliente.getCidade());
            obj.setSenha(cliente.getSenha());
            return clienteRepository.save(obj);
        });
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente autenticar(String cpf, String senha) throws Exception{
        Optional<Cliente> obj= this.carregar(cpf);
        if(obj.isPresent()){
            if(senha.equals(obj.get().getSenha())){
                return obj.get();
            }else {
                throw new Exception("CPF ou senha incorretos");
            }
        }else{
            throw new Exception("CPF não cadastrado. Cadastre-se agora!");
        }
    }
    public void enviaEmailSenha(String cpf, String email) throws Exception {
        Optional<Cliente> obj = this.carregar(cpf);
        if (obj.isPresent()) {
            if (obj.get().getEmail().equals(email)) {
                this.ferramentaService.geraToken();
                Email mail = new Email(obj.get());
                this.ferramentaService.enviarEmail(email, "Recuperação de Senha", mail.getHtml().formatted(obj.get().getNome(), this.ferramentaService.geraToken()));
            } else {
                throw new Exception("E-mail ou CPF incorretos!");
            }
        } else {
                throw new Exception("E-mail incorreto!");
        }
    }
    public Optional<Cliente> trocaSenha(String cpf, String senha) {
        return clienteRepository.findByCpf(cpf).map(obj -> {
            obj.setSenha(senha);
            return clienteRepository.save(obj);
        });
    }
    public boolean validaToken(String token){
        return this.ferramentaService.validaToken(token);
    }
}
