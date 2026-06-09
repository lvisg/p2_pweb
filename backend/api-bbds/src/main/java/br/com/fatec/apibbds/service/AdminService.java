package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Admin;
import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AdminService {
    private final AdminRepository adminRepository;
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    public Admin autenticar(Integer codigo, String senha) throws Exception{
        Optional<Admin> obj= this.adminRepository.findById(codigo);
        if(obj.isPresent()){
            if(senha.equals(obj.get().getSenha())){return obj.get();}
        }
        throw new Exception("Código ou senha incorretos");
        }
    }

