package br.com.fatec.apibbds.repository;

import br.com.fatec.apibbds.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query(value= "select * from cliente where cpf=? ", nativeQuery = true)
    public Optional<Cliente> findByCpf(String cpf);
    @Query(value= "select * from cliente where cpf=? ", nativeQuery = true)
    public Cliente findCpf(String cpf);
    @Query(value = "delete from cliente where cpf=?", nativeQuery = true)
    public void deleteByCpf(String cpf);

}
