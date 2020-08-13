import { async, TestBed } from '@angular/core/testing';
import { BoiteEnvoieComponent } from './boite-envoie.component';
describe('BoiteEnvoieComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BoiteEnvoieComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BoiteEnvoieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=boite-envoie.component.spec.js.map