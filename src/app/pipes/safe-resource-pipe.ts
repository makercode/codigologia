// safe-resource.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeResource',
  standalone: true // Si usas Angular 15+ con componentes standalone
})
export class SafeResourcePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Validación básica - puedes hacerla más robusta
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    
    // Sanitizar solo URLs de confianza (ej. YouTube)
    if (this.isValidYoutubeUrl(url)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    
    console.warn('URL no permitida:', url);
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  private isValidYoutubeUrl(url: string): boolean {
    const patterns = [
      /^(https?\:\/\/)?(www\.)?youtube\.com\/embed\/.+/,
      /^(https?\:\/\/)?(www\.)?youtu\.be\/.+/
    ];
    return patterns.some(pattern => pattern.test(url));
  }
}