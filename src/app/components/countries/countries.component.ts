import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailComponent } from '../detail/detail.component';

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
  searchTerm: string = '';
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.apiService.getAll().subscribe((result) => {
      this.countries = result;
      this.totalItems = this.countries ? this.countries.length : 0;
      this.updatePage();
      this.loading = false;
    });
  }

  openCountryDialog(country: any): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '800px',
      height: '500px',
      data: { country: country }
    });
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

  // search() {
  //   // Filter countries based on the search term
  //   if (this.searchTerm.trim() !== '') {
  //     this.pagedCountries = this.countries?.filter(country =>
  //       country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     ) || [];
  //   } else {
  //     // If search term is empty, reset to show all countries
  //     this.updatePage();
  //   }
  // }

  search() {
    // Filter countries based on the search term and selected region
    if (this.searchTerm.trim() !== '') {
      this.pagedCountries = this.countries?.filter(country =>
        country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedRegion === '' || country.region === this.selectedRegion)
      ) || [];
    } else {
      // If search term is empty, apply only the region filter
      this.pagedCountries = this.countries?.filter(country =>
        this.selectedRegion === '' || country.region === this.selectedRegion
      ) || [];
    }
  }

  // Method to handle dropdown value change
  onRegionChange(event: any) {
    this.selectedRegion = event.target.value;
    if (this.selectedRegion === '') {
      this.searchTerm = ''; // Reset search term
      this.search(); // Call search method to apply filtering
    } else {
      this.search(); // Call search method to apply filtering
    }
  }
}
