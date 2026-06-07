package br.com.fatec.apibbds.repository;

import br.com.fatec.apibbds.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    @Query("SELECT p FROM Produto p WHERE p.nome LIKE CONCAT('%', :termo, '%')")
    public Page<Produto> buscar(@Param("termo") String termo, Pageable pageable);
}
