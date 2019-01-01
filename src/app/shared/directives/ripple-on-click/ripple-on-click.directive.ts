import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[rippleOnClick]'
})
export class RippleOnClickDirective {

    @HostListener('click', ['$event'])
    showRippleEffect(event) {

        const targetEl = this._el.nativeElement;
        targetEl.classList.add('ripple-element');

        let inkEl = targetEl.querySelector('.ink');

        if (inkEl) {
            inkEl.classList.remove('animate');
        } else {
            inkEl = document.createElement('span');
            inkEl.classList.add('ink');
            inkEl.style.width = inkEl.style.height = Math.max(targetEl.offsetWidth, targetEl.offsetHeight) + 'px';
            targetEl.appendChild(inkEl);
        }

        inkEl.style.left = (event.offsetX - inkEl.offsetWidth / 2) + 'px';
        inkEl.style.top = (event.offsetY - inkEl.offsetHeight / 2) + 'px';
        inkEl.classList.add('animate');
    }

    constructor(
        private _el: ElementRef,
        private _renderer: Renderer2
    ) { }
}
