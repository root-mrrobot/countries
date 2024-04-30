import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Country } from '../../models/country';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  country: Country | undefined;
  loading: boolean = true;
  loadingText: string = 'Loading data... ';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cca3 = params['cca3'];
      this.apiService.getCountryByCode(cca3).subscribe((countryData: Country[]) => {
        if (countryData && countryData.length > 0) {
          this.country = countryData[0];
        }
      this.loading = false;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/countries']); 
  }
}
