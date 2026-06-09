package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Contato;
import br.com.fatec.apibbds.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContatoService {
    private final ContatoRepository contatoRepository;
    public ContatoService(ContatoRepository contatoRepository){
        this.contatoRepository=contatoRepository;
    }
    public List<Contato> listar(){
        return this.contatoRepository.findAll();
    }
    public Contato salvar(Contato contato){
        return this.contatoRepository.save(contato);
    }
}
