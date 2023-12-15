import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class IndexPage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  constructor(private rickAndMortySvc: RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters()
  }

  //===== Obtener personajes =====
  getCharacters(event?: any) {
    this.params.page += 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.results)
        console.log(this.characters);

        if(event) event.target.complete();
      },
      error: (error: any) => {

        if(event) event.target.complete();
      }
    })
  }

  //===== Buscar personajes por nombre =====
  searchCharacters() {
    this.params.page = 1;

    this.rickAndMortySvc.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results


      },
      error: (error: any) => {


      }
    })
  }

}
