import { Component, OnInit } from '@angular/core';
import { PATH_MAINTENANCE_PAGES } from 'src/app/commons/config/path-pages';
import { ICardMenu } from 'src/app/commons/models/components.interface';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
	readonly menuAdmin: ICardMenu[] = [
		{
			title: 'VENTAS',
			nameImage: 'buys.png',
			active: true,
			path: PATH_MAINTENANCE_PAGES.buy.withSlash
		},
		{
			title: 'EVENTOS',
			nameImage: 'events.png',
			active: false,
			path: PATH_MAINTENANCE_PAGES.events.withSlash
		},
		{
			title: 'GENEROS',
			nameImage: 'genres.png',
			active: false,
			path: PATH_MAINTENANCE_PAGES.genres.withSlash
		},
		{
			title: 'REPORTES',
			nameImage: 'statistics.png',
			active: false,
			path: PATH_MAINTENANCE_PAGES.reports.withSlash
		}
	];
}
