import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  hyphens: auto;
`;

const AccessibilityStatementFi: FunctionComponent = () => {
  return (
    <ContentWrapper lang="fi">
      <h1>Saavutettavuusseloste</h1>
      <p>
        Tämä saavutettavuusseloste koskee Puistotalkoot verkkosivustoa
        (https://puistotalkoot.hel.fi/fi/). Verkkosivustosta vastaa Helsingin
        kaupunki. Tässä selosteessa kerrotaan, kuinka saavutettava verkkosivusto
        on ja miten voit antaa meille palautetta saavutettavuudesta.
      </p>
      <h2>Kuinka saavutettava tämä verkkosivusto on?</h2>
      <p>
        Digitaalisten palveluiden tarjoamista koskevan lain mukaan julkisten
        verkkosivustojen on oltava saavutettavia, eli kaikilla tulee olla
        tasavertaiset mahdollisuudet käyttää niitä.
      </p>
      <p>
        Tämä verkkosivusto täyttää suurilta osin lain vaatimat
        saavutettavuuskriteerit (WCAG-kriteeristö 2.1, A- ja AA-taso).
        Verkkosivustossa on joitakin saavutettavuuspuutteita, jotka on kuvattu
        tarkemmin alempana.
      </p>
      <h2>Sisällöt, jotka eivät ole saavutettavia</h2>
      <p>
        Tämä verkkosivusto ei ole kaikilta osin saavutettava. Alla mainitut
        sisällöt tai toiminnot eivät täytä kaikkia lain asettamia
        saavutettavuusvaatimuksia. Korjaamme havaittuja saavutettavuuspuutteita
        jatkuvasti. Päivitämme tämän selosteen havaittujen puutteiden listausta,
        kun saamme puutteita korjattua.
      </p>
      <h3>Ylä- / alatunniste</h3>
      <ul>
        <li>
          Linkki etusivulle ei ole nimetty yhteneväisellä tavalla eri osissa
          sivustoa (WCAG 2.1: 2.4.4 Linkin tarkoitus (kontekstissa), 2.5.3
          Nimilappu nimessä).
        </li>
        <li>
          Navigaatioelementit eivät ole nimetty yksilöllisesti avustavan
          teknologian käyttäjille (WCAG 2.1: 1.3.1 Informaatio ja suhteet).
        </li>
        <li>
          Kielivalikon vaihtoehtojen roolia ei ilmaista riittävän selkeästi
          (WCAG 2.1: 4.1.2 Nimi, rooli, arvo).
        </li>
        <li>
          Kielivalikon kohdistuksen ilmaisimen kontrastisuhde on liian matala
          (WCAG 2.1: 1.4.11 Ei-tekstimuotoisen sisällön kontrasti).
        </li>
      </ul>
      <h3>Etusivu</h3>
      <ul>
        <li>
          Linkki ilmaistaan virheellisesti painikkeena (WCAG 2.1: 4.1.2 Nimi,
          rooli, arvo).
        </li>
      </ul>
      <h3>Lomake</h3>
      <ul>
        <li>
          Kaikkien elementtien nimi tai rooli ei ilmene riittävän selkeästi
          avustavan teknologian käyttäjille (WCAG 2.1: 4.1.2 Nimi, rooli, arvo).
        </li>
        <li>
          Sivulla on sisältöä, jonka kontrastisuhde taustaan on liian matala
          (WCAG 2.1: 1.4.3 Kontrasti (minimi)).
        </li>
        <li>
          Kaikki tilan muutokset eivät välity automaattisesti avustavan
          teknologian käyttäjille, kuten lomakkeen tyhjentäminen (WCAG 2.1:
          4.1.3 Tilasta kertovat viestit).
        </li>
        <li>
          Virheviestejä ei ole sidottu teknisesti syötekenttiin (WCAG 2.1: 1.3.1
          Informaatio ja suhteet).
        </li>
        <li>
          Kartta-aluetta ei ole merkitty teknisesti (WCAG 2.1: 1.3.1 Informaatio
          ja suhteet).
        </li>
        <li>
          Päivämäärän valitseminen kalenterista voi olla haasteellista avustavan
          teknologian käyttäjille:
          <ul>
            <li>
              Kalenteri avautuu / sulkeutuu automaattisesti ilman käyttäjän
              syötettä (WCAG 2.1: 3.2.2 Syöte).
            </li>
            <li>
              Tilan muutoksia ei ilmaista avustavan teknologian käyttäjille
              (WCAG 2.1: 4.1.3 Tilasta kertovat viestit).
            </li>
            <li>
              Kaikki interaktiiviset elementit eivät ole näppäimistöllä
              käytettäviä (WCAG 2.1: 2.1.1 Näppäimistö).
            </li>
            <li>
              Nuolipainikkeiden saavutettavat nimet eivät ole sivulle valitun
              kielen mukaisia (WCAG 2.1: 3.1.2 Osien kieli).
            </li>
            <li>
              Nuolipainikkeiden kontrastisuhde taustaan on liian matala (WCAG
              2.1: 1.4.11 Ei-tekstimuotoisen sisällön kontrasti).
            </li>
          </ul>
        </li>
      </ul>
      <h2>Saavutettavuuden arviointi</h2>
      <p>
        Saavutettavuuden arvioinnissa on noudatettu Helsingin kaupungin
        työohjetta ja menetelmiä, jotka pyrkivät varmistamaan palvelun
        saavutettavuuden kaikissa työvaiheissa.
      </p>
      <p>
        Saavutettavuus on tarkistettu ulkopuolisen asiantuntijan suorittamana
        arviointina. Saavutettavuus on tarkistettu käyttäen ohjelmallista
        saavutettavuustarkistusta sekä verkkosivuston ja sisällön manuaalista
        tarkistusta.
      </p>
      <h2>Huomasitko puutteita saavutettavuudessa?</h2>
      <p>
        Pyrimme jatkuvasti parantamaan verkkosivuston saavutettavuutta. Ota
        meihin yhteyttä, jos löydät saavutettavuuspuutteita, joita ei ole
        kuvattu tällä sivulla, tai tarvitsemasi aineisto ei ole saavutettavaa.
        <a href="https://palautteet.hel.fi/fi">
          Anna palautetta palautelomakkeella.
        </a>
      </p>
      <h2>Saavutettavuuden valvonta</h2>
      <p>
        Liikenne- ja viestintävirasto Traficom valvoo saavutettavuusvaatimusten
        toteutumista. Jos et ole tyytyväinen saamaasi vastaukseen tai et saa
        vastausta lainkaan kahden viikon aikana, voit tehdä ilmoituksen
        Liikenne- ja viestintävirasto Traficomiin. Liikenne- ja viestintävirasto
        Traficomin sivulla kerrotaan tarkasti, miten ilmoituksen voi tehdä ja
        miten asia käsitellään.
      </p>
      <p>
        Liikenne- ja viestintävirasto Traficom
        <br />
        Digitaalisen esteettömyyden ja saavutettavuuden valvontayksikkö <br />
        www.saavutettavuusvaatimukset.fi <br />
        saavutettavuus@traficom.fi <br />
        puhelinnumero vaihde 029 534 5000
      </p>
      <a href="https://www.saavutettavuusvaatimukset.fi">
        www.saavutettavuusvaatimukset.fi
      </a>
      <h2>Saavutettavuusselosteen tiedot</h2>
      <p>Verkkosivusto on julkaistu 23.9.2018 jälkeen.</p>
      <p>Seloste on laadittu 18.5.2020.</p>
      <p>Seloste on päivitetty 5.3.2025.</p>
      <a href="https://www.finlex.fi/fi/lainsaadanto/saadoskokoelma/2019/306">
        Laki digitaalisten palvelujen tarjoamisesta (306/2019)
      </a>
    </ContentWrapper>
  );
};

export default AccessibilityStatementFi;
