import { async, TestBed } from '@angular/core/testing';
import { SimpleLineIconsComponent } from './simple-line-icons.component';
describe('SimpleLineIconsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SimpleLineIconsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SimpleLineIconsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=simple-line-icons.component.spec.js.map