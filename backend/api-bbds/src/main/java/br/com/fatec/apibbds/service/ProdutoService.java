package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Produto;
import br.com.fatec.apibbds.repository.ProdutoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    public ProdutoService(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }
    public List<Produto> listar(){
       return produtoRepository.findAll();
    }
    public Optional<Produto> carregar(Integer codigo){
        return produtoRepository.findById(codigo);
    }
    public void salvar(Produto produto){
        produtoRepository.save(produto);
    }
    public Optional<Produto> deletar(Produto produto){
        Optional<Produto> obj = produtoRepository.findById(produto.getCodigo());
        if(obj.isPresent()){
            produtoRepository.delete(produto);
        }
        return obj;
    }
    public Optional<Produto> alterar(Produto produto, Integer codigo){
        return produtoRepository.findById(codigo).map(obj->{
            obj.setCodigo(produto.getCodigo());
            obj.setNome(produto.getNome());
            obj.setValor(produto.getValor());
            obj.setDescricao(produto.getDescricao());
            obj.setQtd(produto.getQtd());
            obj.setKeyword(produto.getKeyword());
            obj.setPromo(produto.getPromo());
            return produtoRepository.save(obj);
        });
    }

    public Page<Produto> buscar(String termo, int tamanho, int page) {
        Pageable pageable = PageRequest.of(page, tamanho);
        return produtoRepository.buscar(termo, pageable);
    }
}
