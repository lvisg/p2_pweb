import {Routes} from '@angular/router';
import {Vitrine} from './componentes/vitrine/vitrine';
import {Contato} from './componentes/contato/contato';
import {Cadastro} from './componentes/cadastro/cadastro';
import {Login} from './componentes//login/login';
import {SobreNos} from './componentes/sobre-nos/sobre-nos';
import {Carrinho} from './componentes/carrinho/carrinho';
import { Detalhe } from './componentes/detalhe/detalhe';
import { Checkout } from './componentes/checkout/checkout';
import { TrocaSenha } from './componentes/troca-senha/troca-senha';
import { ValidaToken } from './componentes/valida-token/valida-token';
import { ReenviaSenha } from './componentes/reenvia-senha/reenvia-senha';
import { MeusPedidos } from './componentes/meus-pedidos/meus-pedidos';
import { Busca } from './componentes/busca/busca';
import { Gestao } from './componentes/gestao/gestao';
export const routes: Routes = [
  { path: 'contato', component: Contato },
  { path: '', component: Vitrine },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: 'sobre-nos', component: SobreNos },
  { path: 'carrinho', component: Carrinho },
  { path: 'detalhe', component: Detalhe },
  { path: 'checkout', component: Checkout },
  { path: 'reenvia-senha', component: ReenviaSenha },
  { path: 'troca-senha', component: TrocaSenha },
  { path: 'valida-token', component: ValidaToken },
  { path: 'meus-pedidos', component: MeusPedidos },
  { path: 'busca', component: Busca },
  { path: 'gestao', component: Gestao },
];
