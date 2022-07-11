import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardEventComponent } from 'src/app/commons/components/card-event/card-event.component';
import { PATH_BUY_PAGES } from 'src/app/commons/config/path-pages';
import { ICardEvent } from 'src/app/commons/models/components.interface';
import { IHomeEvents, IHomeGenres } from 'src/app/commons/services/api/home/home-api.interface';
import { HomeApiService } from 'src/app/commons/services/api/home/home-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, AfterViewInit {
	@ViewChild('genreTitle') genreTitle?: ElementRef<HTMLHeadingElement>;
	@ViewChild('cardEvent') cardEvent?: CardEventComponent;

	genre = 'Géneros';
	listGenres: IHomeGenres[] = [];
	listEvents: ICardEvent[] = [];

	constructor(
		private _homeApiService: HomeApiService,
		private _router: Router
	) {}

	ngAfterViewInit(): void {
		console.log('-genreTitle viewchild--', this.genreTitle);
		// setTimeout(() => {
		console.log('--cardEvent viewchild---', this.cardEvent);
		// }, 1000);

		// this.genreTitle!.nativeElement.innerText = 'MitCode';
	}

	ngOnInit(): void {
		this._loadHome();
		//this._loadDemoCors();
	}



	clickCard(event: ICardEvent): void {
		this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: { event } });
	}

	private _loadHome() {
		this._homeApiService.getHome().subscribe({
			next: (response) => {
				this.listGenres = response.genres.result;
				this._castEventsResponse(response.concerts.result);
			}
		});
	}

	private _castEventsResponse(listEventResponse: IHomeEvents[]): void {
		this.listEvents = listEventResponse.map((item) => {
			const event: ICardEvent = {
				idEvent: item.id,
				urlImage: item.imageUrl,
				title: item.title,
				description: item.description,
				date: item.dateEvent,
				hour: item.timeEvent,
				price: item.unitPrice,
				genre: item.genre,
				place: item.place
			};

			return event;
		});
	}
}