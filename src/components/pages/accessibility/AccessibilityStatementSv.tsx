import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  hyphens: auto;
`;

const AccessibilityStatementSv: FunctionComponent = () => {
  return (
    <ContentWrapper lang="sv">
      <h1>Tillgänglighetsutlåtande</h1>
      <p>
        Detta tillgänglighetsutlåtande gäller webbplatsen Parktalko
        (https://puistotalkoot.hel.fi/sv/). Helsingfors stad ansvarar för
        webbplatsen. Detta utlåtande beskriver hur tillgänglig webbplatsen är
        och hur du kan ge oss respons om dess tillgänglighet.
      </p>
      <h2>Hur tillgänglig är denna webbplats? </h2>
      <p>
        Enligt lagen om tillhandahållande av digitala tjänster ska webbplatser
        för den offentliga förvaltningen vara tillgängliga, vilket betyder att
        alla ska ha lika möjligheter att använda dem.
      </p>
      <p>
        Denna webbplats uppfyller till största delen de tillgänglighetskriterier
        som lagen förutsätter (WCAG-kriterierna 2.1, nivå A och AA). Webbplatsen
        har vissa brister i tillgängligheten. Bristerna beskrivs noggrannare
        nedan.
      </p>
      <h2>Innehåll som inte är tillgängligt </h2>
      <p>
        Webbplatsen är inte till alla delar tillgänglig. Innehållet eller
        funktionerna som nämns nedan uppfyller inte alla
        tillgänglighetskriterier som fastställs i lagen. Vi åtgärdar fortlöpande
        de brister i tillgängligheten som vi upptäcker. Vi uppdaterar
        förteckningen över bristerna i tillgängligheten i det här utlåtandet
        vartefter vi åtgärdar bristerna.
      </p>
      <h3>Sidhuvud/sidfot </h3>
      <ul>
        <li>
          Länken till förstasidan är inte namngiven på samma sätt på olika delar
          av webbplatsen (WCAG 2.1: 2.4.4 Länkens syfte (i sammanhanget), 2.5.3
          Etikett i titeln).
        </li>
        <li>
          Navigationselementen är inte individuellt namngivna för användare av
          assisterande teknik (WCAG 2.1: 1.3.1 Information och relationer).
        </li>
        <li>
          Språkalternativens roll i menyn är inte tillräckligt tydlig (WCAG 2.1:
          4.1.2 Namn, roll, värde).
        </li>
        <li>
          Kontrastförhållandet för språkmenyns justeringsindikator är för lågt
          (WCAG 2.1: 1.4.11 Använd tillräckliga kontraster i komponenter och
          grafik).
        </li>
      </ul>
      <h3>Förstasida</h3>
      <ul>
        <li>
          Länken är felaktigt uttryckt som ett knappelement (WCAG 2.1: 4.1.2
          Namn, roll, värde).
        </li>
      </ul>
      <h3>Blankett</h3>
      <ul>
        <li>
          Namnet eller rollen för alla element är inte tillräckligt tydliga för
          användare av assisterande teknik (WCAG 2.1: 4.1.2 Namn, roll,
          värde).{' '}
        </li>
        <li>
          Sidan har innehåll med för lågt kontrastförhållande mot bakgrunden
          (WCAG 2.1: 1.4.3 Kontrast (minimum)).
        </li>
        <li>
          Alla statusändringar överförs inte automatiskt till användare av
          assisterande teknik, såsom tömning av blanketten (WCAG 2.1: 4.1.3
          Meddelanden om status).
        </li>
        <li>
          Felmeddelanden är inte tekniskt kopplade till inmatningsfälten (WCAG
          2.1: 1.3.1 Information och relationer).
        </li>
        <li>
          Kartområdet är inte tekniskt markerat (WCAG 2.1: 1.3.1 Information och
          relationer).
        </li>
        <li>
          Det kan vara svårt att välja datum i kalendern för användare av
          assisterande teknik:
          <ul>
            <li>
              Kalendern öppnas/stängs automatiskt utan användarinmatning (WCAG
              2.1: 3.2.2 Input).
            </li>
            <li>
              Statusändringar anges inte för användare av assisterande teknik
              (WCAG 2.1: 4.1.3 Meddelanden om status).
            </li>
            <li>
              Alla interaktiva element är inte tillgängliga via tangentbordet
              (WCAG 2.1: 2.1.1 Tangentbord).
            </li>
            <li>
              De tillgängliga namnen på pilknapparna överensstämmer inte med det
              språk som valts på sidan (WCAG 2.1: 3.1.2 Komponenternas språk).
            </li>
            <li>
              Kontrastförhållandet mellan pilknapparna och bakgrunden är för
              lågt (WCAG 2.1: 1.4.11 Använd tillräckliga kontraster i
              komponenter och grafik).
            </li>
          </ul>
        </li>
      </ul>
      <h2>Utvärdering av tillgängligheten</h2>
      <p>
        I utvärderingen av tillgängligheten har man följt Helsingfors stads
        arbetsordning och metoder som syftar till att säkerställa tjänstens
        tillgänglighet i alla arbetsmoment.
      </p>
      <p>
        Tillgängligheten har kontrollerats och utvärderats av en utomstående
        sakkunnig. Tillgängligheten har kontrollerats med hjälp av automatisk
        tillgänglighetskontroll samt manuell kontroll av webbplatsen och dess
        innehåll.
      </p>
      <h2>Har du upptäckt brister i tillgängligheten?</h2>
      <p>
        Vi försöker hela tiden förbättra webbplatsens tillgänglighet. Ta kontakt
        med oss om du upptäcker brister i tillgängligheten som inte har
        beskrivits på den här sidan eller om innehållet du behöver inte är
        tillgängligt.{' '}
        <a href="https://palautteet.hel.fi/sv">
          Ge respons med den här responsblanketten
        </a>
        .
      </p>
      <h2>Tillgänglighetstillsyn </h2>
      <p>
        Transport- och kommunikationsverket Traficom övervakar att
        tillgänglighetskraven följs. Om du är missnöjd med svaret eller om du
        inte fått något svar inom två veckor, kan du göra en anmälan till
        Transport- och kommunikationsverket Traficom. Transport- och
        kommunikationsverket Traficom meddelar detaljerat på sin webbplats hur
        man går till väga för att lämna in en anmälan och hur den handläggs.
      </p>
      <p>
        Transport- och kommunikationsverket Traficom
        <br />
        Enheten för tillsyn över digital tillgänglighet
        <br />
        www.tillganglighetskrav.fi
        <br />
        tillganglighet@traficom.fi
        <br />
        telefonnummer växeln 029 534 5000
      </p>
      <a href="https://www.tillganglighetskrav.fi">
        www.tillganglighetskrav.fi
      </a>
      <h2>Uppgifter om tillgänglighetsutlåtandet</h2>
      <p>Webbplatsen har publicerats 23.9.2018.</p>
      <p>Utlåtandet har upprättats 18.5.2020.</p>
      <p>Utlåtandet har uppdaterats 5.3.2025. </p>
      <a href="https://www.finlex.fi/sv/laki/alkup/2019/20190306">
        Lag om tillhandahållande av digitala tjänster (306/2019)
      </a>
    </ContentWrapper>
  );
};

export default AccessibilityStatementSv;
