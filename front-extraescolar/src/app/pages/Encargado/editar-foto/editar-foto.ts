import { Component, ElementRef, OnDestroy, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-editar-foto',
  styleUrl: './editar-foto.css',
  templateUrl: './editar-foto.html',
})
export class EditarFoto implements OnDestroy {
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private stream: MediaStream | null = null;

  fotoUrl: string | null = null;
  archivoFoto: Blob | null = null;
  camaraActiva = false;
  error = '';

  onArchivoSeleccionado(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;

    this.detenerCamara();
    this.establecerFoto(archivo);
  }

  async abrirCamara(): Promise<void> {
    this.error = '';
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      this.video().nativeElement.srcObject = this.stream;
      this.camaraActiva = true;
    } catch {
      this.error = 'No se pudo acceder a la cámara. Revisa los permisos del navegador.';
    }
  }

  capturarFoto(): void {
    const video = this.video().nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        this.detenerCamara();
        this.establecerFoto(blob);
      },
      'image/jpeg',
      0.9,
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.archivoFoto) return;

    const datos = new FormData();
    datos.append('foto', this.archivoFoto, 'perfil.jpg');
    // TODO: enviar `datos` a tu servicio HTTP (POST/PUT de la foto de perfil).
    console.log('Foto lista para enviar:', datos.get('foto'));
  }

  regresar(): void {
    // TODO: navegar a Mi Perfil (Router o Location.back()).
  }

  cerrarSesion(): void {
    // TODO: llamar al servicio de autenticación y redirigir al login.
  }

  ngOnDestroy(): void {
    this.detenerCamara();
    if (this.fotoUrl) URL.revokeObjectURL(this.fotoUrl);
  }

  private establecerFoto(foto: Blob): void {
    if (this.fotoUrl) URL.revokeObjectURL(this.fotoUrl);
    this.archivoFoto = foto;
    this.fotoUrl = URL.createObjectURL(foto);
    this.error = '';
  }

  private detenerCamara(): void {
    this.stream?.getTracks().forEach((pista) => pista.stop());
    this.stream = null;
    this.camaraActiva = false;
  }
}