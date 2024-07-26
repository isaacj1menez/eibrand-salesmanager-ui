import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit {

    constructor(public layoutService: LayoutService, public router: Router, private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        const menuLinks = document.querySelectorAll('.menu-link');

        menuLinks.forEach(link => {
            this.renderer.listen(link, 'click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            this.renderer.listen(ctaButton, 'click', () => {
                const targetElement = document.getElementById('nosotros');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}
