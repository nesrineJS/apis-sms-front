import { async, TestBed } from '@angular/core/testing';
import { Page500Component } from './page500.component';
describe('Page500Component', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [Page500Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(Page500Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=page500.component.spec.js.map