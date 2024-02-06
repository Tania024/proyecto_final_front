import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  iniciarSesion(): void {
    this.clienteService
      .getClientePorUsuario(this.usuario)
      .subscribe(
        (cliente: Cliente) => {
          if (cliente && cliente.cli_contrasena === this.contrasena) {
             this.router.navigate(['components/inicio']);
          } else {
            console.error('Credenciales incorrectas');
            alert('Credenciales incorrectas');
          }
        },
        error => {
          console.error('Error al obtener cliente:', error);
          alert('Error al iniciar sesión');
        }
      );
  }
}