import { TestBed } from '@angular/core/testing';
import { DragDropService } from './drag-drop.service';


describe('DimensionsService', () => {
  let service: DragDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
