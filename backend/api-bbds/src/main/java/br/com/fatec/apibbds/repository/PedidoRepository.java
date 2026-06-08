package br.com.fatec.apibbds.repository;

import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    @Query(value = "select * from pedido where cliente_codigo=?", nativeQuery = true)
    public List<Pedido> findPedidoByCliente(Integer codigo);

}
