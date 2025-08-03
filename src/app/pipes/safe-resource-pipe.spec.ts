import { SafeResourcePipe } from './safe-resource-pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeResourcePipe', () => {
  let pipe: SafeResourcePipe;
  let sanitizer: DomSanitizer;

  // Mock del DomSanitizer
  class MockSanitizer {
    bypassSecurityTrustResourceUrl(url: string) {
      return { __safeValue: url }; // Objeto simulado que devuelve Angular realmente
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DomSanitizer, useClass: MockSanitizer }
      ]
    });
    
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeResourcePipe(sanitizer);
  });

  it('debería crearse correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('debería sanitizar URLs válidas de YouTube (embed)', () => {
      const youtubeUrl = 'https://www.youtube.com/embed/abc123';
      const result = pipe.transform(youtubeUrl);
      expect(result).toEqual(jasmine.objectContaining({
        __safeValue: youtubeUrl
      }));
    });

    it('debería sanitizar URLs válidas de YouTube (youtu.be)', () => {
      const youtubeUrl = 'https://youtu.be/def456';
      const result = pipe.transform(youtubeUrl);
      expect(result).toEqual(jasmine.objectContaining({
        __safeValue: youtubeUrl
      }));
    });

    it('debería retornar valor vacío para URLs no permitidas', () => {
      const unsafeUrl = 'https://malicious-site.com/script.js';
      const result = pipe.transform(unsafeUrl);
      expect(result).toEqual(jasmine.objectContaining({
        __safeValue: ''
      }));
    });

    it('debería manejar valores nulos o indefinidos', () => {
      expect(pipe.transform('')).toEqual(jasmine.objectContaining({ __safeValue: '' }));
      expect(pipe.transform(null as any)).toEqual(jasmine.objectContaining({ __safeValue: '' }));
      expect(pipe.transform(undefined as any)).toEqual(jasmine.objectContaining({ __safeValue: '' }));
    });

    it('debería mostrar warning en consola para URLs no permitidas', () => {
      spyOn(console, 'warn');
      const unsafeUrl = 'http://untrusted.com';
      pipe.transform(unsafeUrl);
      expect(console.warn).toHaveBeenCalledWith('URL no permitida:', unsafeUrl);
    });
  })
})
