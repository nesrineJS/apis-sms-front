import { async, TestBed } from '@angular/core/testing';
import { FontAwesomeComponent } from './font-awesome.component';
describe('FontAwesomeComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FontAwesomeComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FontAwesomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=font-awesome.component.spec.js.map