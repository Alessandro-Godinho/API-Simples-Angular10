import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Contato from '../contato';
import { DadosService } from '../dados.service';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  lista: Contato[] = [];
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'acoes'];

  constructor(private dadosService: DadosService, private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.dadosService.getDados().subscribe(
      (dados: Contato[]) => {
        this.lista = dados;
      },
      (error: any) => {
        console.error('Erro ao obter os dados:', error);
      }
    );
  }

  abrirFormulario(contato?: Contato) {
    const dialogRef = this.dialog.open(FormularioContatoComponent, {
      width: '400px',
      data: { contato }
    });

    dialogRef.componentInstance.salvar.subscribe((novoContato: Contato) => {
      if (novoContato) {
        if (contato) {
          this.atualizarContato(novoContato);
        } else {
          this.salvarContato(novoContato);
        }
      }
      dialogRef.close();
    });
  }

  salvarContato(contato: Contato) {
    this.dadosService.salvarContato(contato).subscribe(
      (novoContato: Contato) => {
        this.lista.push(novoContato);
      },
      (error: any) => {
        console.error('Erro ao salvar o contato:', error);
      }
    );
  }

  atualizarContato(contato: Contato) {
    this.dadosService.atualizarContato(contato).subscribe(
      (contatoAtualizado: Contato) => {
        const index = this.lista.findIndex(c => c.id === contatoAtualizado.id);
        if (index !== -1) {
          this.lista[index] = contatoAtualizado;
        }
      },
      (error: any) => {
        console.error('Erro ao atualizar o contato:', error);
      }
    );
  }

  excluirContato(contato: Contato) {
    if (confirm('Deseja realmente excluir o contato?')) {
      this.dadosService.excluirContato(contato.id).subscribe(
        () => {
          this.lista = this.lista.filter(c => c.id !== contato.id);
        },
        (error: any) => {
          console.error('Erro ao excluir o contato:', error);
        }
      );
    }
  }
}
