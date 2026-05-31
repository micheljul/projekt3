import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-schueler-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './schueler-detail.component.html',
  styleUrls: ['./schueler-detail.component.scss']
})
export class SchuelerDetailComponent implements OnInit {
  schuelerId: string | null = null;

  // Platzhalter, bis die echte Datenbank-Abfrage programmiert ist
  schuelerName: string = 'Mark Slovak';
  schuelerKlasse: string = '4AHITM';
  schuelerHobbys: string = 'Bouldern, Rennrad fahren, Programmieren';
  schuelerBeschreibung: string = 'Ich bin ca. 192 cm groß und baue gerne Web-Apps.';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.schuelerId = this.route.snapshot.paramMap.get('id');
  }
}
