import { async, TestBed } from '@angular/core/testing';
import { ConditionalDivComponent } from './conditional-div.component';
describe('ConditionalDivComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ConditionalDivComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ConditionalDivComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=conditional-div.component.spec.js.map