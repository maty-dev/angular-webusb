import { Component } from '@angular/core';

@Component({
  selector: 'app-thermal-printer',
  standalone: true,
  imports: [],
  templateUrl: './thermal-printer.component.html',
  styleUrl: './thermal-printer.component.css'
})
export class ThermalPrinterComponent {
  date: string = new Date().toLocaleDateString();

  onPrint(){
    const popupWinindow: any = window.open();

    popupWinindow.document.write(
      `
        <!DOCTYPE html>
        <html>
          <title>Print</title>
          <style>
            html {
              padding: 0;
              margin: 0;
              font-family: monospace;
              width: 80mm;
            }
    
            body {
              margin: 0;
              padding: 8px;
            }

            h2, p {
              text-align: center;
            }

            .singleLine {
              margin-top: 0.25rem;
              margin-bottom: 0.25rem;
              white-space: pre-wrap;
            }
          
            .printAreaContainer {
              padding: 8px;
            }
          
            .fontMono {
              font-family: monospace;
            }
          
            .textCenter {
              text-align: center;
            }
          
            .textRight {
              text-align: right;
            }
          
            .textLeft {
              text-align: left;
            }
          
            .fontBold {
              font-weight: bold;
            }
          
            .grid4Col {
              display: grid;
              column-gap: 5px;
              grid-template-columns: 1fr auto auto auto;
            }
          
            .gridBorderSolid {
              border-bottom: 1px solid;
            }
            
            .gridBorderDashed {
              border-bottom: 1px dashed;
            }
            
            .gridBorderDouble {
              border-bottom: 3px double;
            }
            
            .gridBorder {
              grid-column: 1 / -1;
              margin: 4px 0;
            }
            
            .nowrap {
              overflow: hidden;
              text-overflow: clip;
              white-space: nowrap;
            }
            
            .colSpan3 {
              grid-column: span 3 / span 3;
            }
            
            .maxLine2 {
              max-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            picture{
              display: grid;
              place-items: center;
            }
          </style>
  
          <body onload="window.print()"> 
            <article>
              <h2>Greetings Deivid, from the Devs Adviters team in Argentina !!</h2>
              <p>Date: 11/04/24</p>
    
              <div class="grid4Col">
                <div><strong class="textRight">Item</strong></div>
                <div class="textRight"><strong>Amount</strong></div>
                <div class="textRight"><strong>Price</strong></div>
                <div class="textRight"><strong>Total</strong></div>
                
                <div class="gridBorder gridBorderDouble"></div>
                
                <div class="maxLine2">Service 1</div>
                <div class="textRight">1</div>
                <div class="textRight">$10</div>
                <div class="textRight">$10</div>
                
                <div class="maxLine2">Service 2</div>
                <div class="textRight">2</div>
                <div class="textRight">$10</div>
                <div class="textRight">$20</div>
                
                <div class="gridBorder gridBorderSolid"></div>
                
                <div class="colSpan3 maxLine2">
                  <strong>Total</strong>
                </div>
                
                <div class="textRight"><strong>$30</strong></div>
              </div>
    
              <picture>
                <img src="assets/example-image.png" with="100" height="100" alt="angular" />
              </picture>

              <p>Thank you very much for purchasing.</p>
            </article> 
          </body>
  
          <script>
            window.onafterprint = event => window.close();
          </script>
        </html>
      `
    );

    popupWinindow.print();
  }
}
