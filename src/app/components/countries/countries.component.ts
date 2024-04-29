import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
  countries: any[] | undefined;
  pagedCountries: any[] = [];
  pageSizeOptions: number[] = [12, 24, 60, 100];
  pageSize: number = 12;
  totalItems: number = 0;
  loading: boolean = true;
  loadingText: string = 'Loading data... ';
  searchTerm: string = '';
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string = '';
  selectedPopulationRange: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.apiService.getAll().subscribe((result) => {
      this.countries = result.sort((a, b) => a.name.common.localeCompare(b.name.common));
      this.totalItems = this.countries ? this.countries.length : 0;
      this.updatePage();
      this.loading = false;
    });
  }

  openCountryDetail(code: string): void {
    this.router.navigate(['/country', code]);
  }

  updatePage() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.pagedCountries = this.countries?.slice(startIndex, startIndex + this.paginator.pageSize) || [];
    }
  }

  onPageChange(event: PageEvent) {
    this.updatePage();
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.updatePage();
  }

  search() {
    // Filter countries based on the search term, region, and population range
    if (this.searchTerm.trim() !== '') {
      this.pagedCountries = this.countries?.filter(country =>
        country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedRegion === '' || country.region === this.selectedRegion) &&
        (this.selectedPopulationRange === '' || this.filterByPopulation(country))
      ) || [];
    } else {
      // If search term is empty, apply only the region and population range filter
      this.pagedCountries = this.countries?.filter(country =>
        (this.selectedRegion === '' || country.region === this.selectedRegion) &&
        (this.selectedPopulationRange === '' || this.filterByPopulation(country))
      ) || [];
    }
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.target.value;
    if (this.selectedRegion === '') {
      this.searchTerm = ''; // Reset search term
      this.search(); 
    } else {
      this.search(); 
    }
  }

  onPopulationRangeChange(event: any) {
    this.selectedPopulationRange = event.target.value;
    this.search(); // Trigger search to apply new filter
  }

  filterByPopulation(country: any): boolean {
    const population = country.population;
    if (this.selectedPopulationRange === 'small') {
      return population < 1000000;
    } else if (this.selectedPopulationRange === 'medium') {
      return population >= 1000000 && population <= 10000000;
    } else if (this.selectedPopulationRange === 'large') {
      return population > 10000000;
    }
    return true;
  }
}
