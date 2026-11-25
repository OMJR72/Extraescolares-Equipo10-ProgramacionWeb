import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-alumno-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './alumno-layout.html',
  styleUrl: './alumno-layout.css'
})
export class AlumnoLayoutComponent {

}