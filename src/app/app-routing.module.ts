import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { FormularioContatoComponent } from './formulario-contato/formulario-contato.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'contatos/adicionar', component: FormularioContatoComponent },
  { path: 'contatos/editar/:id', component: FormularioContatoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
