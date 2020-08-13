import { async, TestBed } from '@angular/core/testing';
import { Page404Component } from './page404.component';
describe('Page404Component', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [Page404Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(Page404Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=page404.component.spec.js.map