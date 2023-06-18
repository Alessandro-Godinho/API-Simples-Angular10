import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Contato from '../contato';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-formulario-contato',
  templateUrl: './formulario-contato.component.html',
  styleUrls: ['./formulario-contato.component.scss']
})    
export class FormularioContatoComponent {
  contatoForm: FormGroup;
  @Input() contato: Contato | undefined; // Propriedade de entrada para receber o contato a ser editado
  @Output() salvar: EventEmitter<Contato> = new EventEmitter<Contato>();

  constructor(
    private formBuilder: FormBuilder,
    private dadosService: DadosService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.contatoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }
  
  ngOnInit() {

    const paramId = this.routes.snapshot.paramMap.get("id")
    
    if (paramId != null) {
      this.dadosService.buscarContatoPorId(paramId).subscribe(
        (contato: Contato) => {
          this.contatoForm.patchValue({
            nome: contato.nome,
            email: contato.email,
            telefone: contato.telefone
          });
          
        },
        (error: any) => {
          console.error('Erro ao obter os dados:', error);
        }
      );
    }
    
    console.log(this.contato);
    
    
   
  }
  salvarContato() {
    if (this.contatoForm.invalid) {
      return;
    }

    const novoContato: Contato = {
      id: '', // O ID será gerado pelo servidor ao salvar
      nome: this.contatoForm.value.nome,
      email: this.contatoForm.value.email,
      telefone: this.contatoForm.value.telefone
    };

    if (this.contato) {
      // Editando um contato existente
      novoContato.id = this.contato.id; // Mantém o ID do contato original

      this.dadosService.atualizarContato(novoContato).subscribe(
        (contatoAtualizado: Contato) => {
          this.salvar.emit(contatoAtualizado);
          this.router.navigate(['/listagem']); // Redireciona para a página de listagem
        },
        (error: any) => {
          console.error('Erro ao atualizar o contato:', error);
        }
      );
    } else {
      // Criando um novo contato
      this.dadosService.salvarContato(novoContato).subscribe(
        (contatoSalvo: Contato) => {
          this.salvar.emit(contatoSalvo);
          this.router.navigate(['/listagem']); // Redireciona para a página de listagem
        },
        (error: any) => {
          console.error('Erro ao salvar o contato:', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/listagem']); // Redireciona para a página de listagem
  }
}
